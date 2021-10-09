const fs = require("fs");

module.exports = {
    name: "nick",
    description: "Handles mass user nickname changes.",
    usage: `
    !nero nick save
    *Saves every user's nickname to memory.*
    
    !nero nick randomize
    *Mixes around all users' nicknames.*

    !nero nick set **\`NICKNAME\`**
    *Sets ever user's nickname to the given nickname.*

    !nero nick reset
    *Resets all nicknames to what was previously saved*

    !nero nick remove
    *Removes all nicknames.*`,
    examples: `
    *!nero nick save*
    *!nero nick randomize*
    *!nero nick set idiot*
    *!nero nick reset*
    *!nero nick remove*`,
    execute(msg, args) {
        if (!args.length) {
            return;
        }

        let nicknames = {};

        try {
            nicknames = JSON.parse(fs.readFileSync("resources/nicknames.json"));
        } catch (err) {
            console.log(err);
        }

        switch(args[0]) {
            case "save":
                msg.guild.members.fetch()
                    .then(members => {
                        return members.each((member) => {
                            nicknames[member.user.id] = member.nickname || member.user.username;
                        });
                    })
                    .then(() => {
                        return fs.writeFileSync("resources/nicknames.json", JSON.stringify(nicknames, null, 3));
                    })
                    .catch(console.error)
                    .finally(() => {
                        msg.channel.send(JSON.stringify(nicknames, null, 3));
                    });
                break;
            case "randomize":
                const pool = Object.values(nicknames);

                Object.keys(nicknames).forEach(userId => {
                    if (userId === msg.guild.ownerID) {
                        console.log(`Can't change nickname of server owner`)
                        return;
                    }

                    msg.guild.members.fetch(userId)
                        .then(member => {
                            return member.setNickname(pool.length ? pool.splice(Math.floor(Math.random() * pool.length), 1)[0] : "Idiot")
                                .then(() => {
                                    console.log(`${member.user.username} changed to ${member.nickname}.`)
                                });
                        })
                        .catch(err => {
                            console.log(err);
                        })
                })
                break;
            case "set":
                let newNick = args.slice(1).join(' ');

                if (!newNick) {
                    msg.channel.send("No nickname provided");
                    break;
                }

                msg.guild.members.fetch()
                    .then(members => {
                        return members.each(async (member) => {
                            await member.setNickname(newNick)
                                .then(() => {
                                    console.log(`${member.user.username} changed to ${newNick}.`)
                                })
                                .catch(err => {
                                    console.log(`Can't change nickname of ${member.user.username}`);
                                });
                        });
                    })
                    .catch(console.err);
                break;
            case "reset":
                    Object.entries(nicknames).forEach(([userId, nickname]) => {
                        msg.guild.members.fetch(userId)
                            .then((member) => {
                                    return member.setNickname(nickname)
                                    .then(() => {
                                        console.log(`${member.user.username} changed to ${nickname}.`)
                                    });
                            })
                            .catch(err => {
                                console.log(err);
                            });
                    });
                break;
            case "remove":
                msg.guild.members.fetch()
                    .then(members => {
                        return members.each(async (member) => {
                            await member.setNickname(null)
                                .then(() => {
                                    console.log(`${member.user.username} changed to ${member.user.username}.`)
                                })
                                .catch(err => {
                                    console.log(`Can't change nickname of ${member.user.username}`)
                                });
                        });
                    })
                    .catch(console.err);
                break;
        }
    }
};

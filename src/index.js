require("dotenv-flow").config({ path: "./env" });
const Discord = require("discord.js");
const Censor = require("./helpers/censorSim");
const Toggles = require("./Toggles");
const Uwuifier = require("uwuifier");
const uwuifier = new Uwuifier();

const TOKEN = process.env.TOKEN;

const client = new Discord.Client();

client.commands = new Discord.Collection();

Object.entries(require("./commandList")).map(([name, command]) => {
    client.commands.set(name, command);
})

client.login(TOKEN);

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", async (msg) => {
    let author = msg.guild.member(msg.author);
    // let self = msg.guild.member(client.user);


    if (msg.content.charAt(0) !== '!') {
        if (!author.user.bot && Toggles.any()) {
            let msgContent = msg.content;

            let doUwu = Math.floor(Math.random() * (1 / Toggles.uwuChance)) == 0;

            if (Toggles.globalCensor && Censor.isObscene(msgContent) || Toggles.globalUwu || doUwu) {
                await msg.delete();

                if (Toggles.globalCensor && Censor.isObscene(msgContent)) {
                    msgContent = Censor.censor(msgContent).replace(new RegExp("\\*", 'g'), '\\*');
                }

                if (Toggles.globalUwu || doUwu) {
                    msgContent = uwuifier.uwuifySentence(msgContent);
                }

                await msg.channel.send(`${author.displayName}: ${msgContent}`);
            }

        }
        return;
    }

    let command = msg.content.slice(1).split(/ +/);
    let args = command.splice(1);
    command = command[0];

    if (!client.commands.has(command)) {
        return;
    }

    try {
        client.commands.get(command).execute(msg, args);
    } catch (err) {
        console.error(err);
    }


});

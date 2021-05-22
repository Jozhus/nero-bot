const Discord = require("discord.js");
const Modifiers = require("./Modifiers");

const TOKEN = process.env.TOKEN;

const client = new Discord.Client();

client.commands = new Discord.Collection();

Object.entries(require("./CommandList")).map(([name, command]) => {
    client.commands.set(name, command);
})

client.login(TOKEN);

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", async (msg) => {
    // let self = msg.guild.member(client.user);
    if (!msg.content.startsWith("!nero")) {
        if (!msg.guild.member(msg.author).user.bot) {
            Modifiers.enforceRules(msg);
        }

        return;
    }

    let command = msg.content.slice(6).split(/ +/);
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

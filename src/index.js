require("dotenv-flow").config({ path: "./env" });
const Discord = require("discord.js");

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

client.on("message", msg => {
    if (msg.content.charAt(0) !== '!') {
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

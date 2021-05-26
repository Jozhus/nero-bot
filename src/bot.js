const db = require("./constants/globals");
const Discord = require("discord.js");
const merge = require("deepmerge");
const Modifiers = require("./Modifiers");

const TOKEN = process.env.TOKEN;

const client = new Discord.Client();

client.commands = new Discord.Collection();

Object.entries(require("./CommandList")).map(([name, command]) => {
    client.commands.set(name, command);
})

client.login(TOKEN);

client.on("ready", async () => {
    console.log(`Logged in as ${client.user.tag}!`);

    var guildIds = client.guilds.cache.map(guild => guild.id)
    guildIds = Array.isArray(guildIds) ? guildIds : [guildIds];

    (await db.getSettings(guildIds)).forEach(guildSettings => {
        switch (guildSettings.component) {
            case "Modifiers":
                Modifiers.loadSettings(guildSettings.guildId, guildSettings.settings);
                break;
            // Add more here when more component settings need to be loaded.
        }
    });
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

client.on("guildCreate", guild => {

});
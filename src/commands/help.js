const commands = require("../CommandList");

const helpCommand = {
    name: "help",
    description: "Provides help for using Nero.",
    usage: `
    !nero help **\`COMMAND NAME\`**
    *Gets the description, usage and examples for the specified command.
    If no command is specified, a list of commands with their descriptions will be displayed.*`,
    examples: `
    *!nero help*
    *!nero help rule*`,
    execute(msg, args) {
        if (!args.length) {
            msg.channel.send(`\`\`\`${Object.values(commands).map(command => command.name).join('\n')}\`\`\``);
            return;
        }

        if (commands[args[0]]) {
            const command = commands[args[0]];
            msg.channel.send(`__**${command.name}**__\n\t*${command.description}*\n\n__Usage__${command.usage}\n\n__Examples__${command.examples}`);
        } else {
            msg.channel.send(`"${args[0]}" command not found. (For a list of commands, try !nero help)`);
        }
    }
};

commands.help = helpCommand;
module.exports = helpCommand;
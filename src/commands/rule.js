const Modifiers = require("../Modifiers");

module.exports = {
    name: "rule",
    description: "Manage filter rules.",
    usage: `
    !nero rule set **\`RULE NAME\`** **\`FILTER NAME(s)\`** **\`CHANNEL(S)\`** **\`TARGET(S)\`** **\`OPTIONS\`**
    *Define what filters will be used in what channels.
    If the rule name already exists, it will be overwritten with the newly made rule.
    Filters will modify incoming text in a specified channel by a specified target (For list of filters, try !nero get list filters)
    Multiple filters, channels, targets and options can be specified by separating them with a ','
    Specifying "global" as a channel will apply it to all channels.
    Specifying "here" as a channel will apply it to the current channel.
    Specifying "all" as a target will apply it to everybody.
    Additional options can optionally be set with the format "**\`OPTION NAME\`**=**\`OPTION VALUE\`**".
    Currently, the only option is chance which is the decimal chance that a the specified rule will apply. (Default is 1)*

    !nero rule get **\`RULE NAME\`**
    *Gets the settings of the specified rule.
    Specifying '\\*' as a rule name will return a list of all rules.*

    !nero rule delete **\`RULE NAME\`**
    *Deletes a specified rule.*`,
    examples: `
    *!nero rule set global-uwu uwu global all*
    *!nero rule set chance-of-hell uwu,censor,ghetto general,here,memes Person1,Person2 chance=0.5*
    *!nero rule get \\**
    *!nero rule get global-uwu*
    *!nero rule delete global-uwu*`,
    execute(msg, args) {
        if (!args.length) {
            return;
        }

        switch (args[0]) {
            case "set":
                const ruleName = args[1];
                const filterNames = args[2].split(',');
                const locations = args[3].split(',').map(location => location === "here" ? msg.channel.name : location);
                const targets = args[4].split(',');
                const options = {
                    chance: 1
                }

                if (args[5]) {
                    args[5].split(',').forEach(optionString => {
                        const [key, value] = optionString.split('=');
                        options[key] = parseFloat(value);
                    });
                }

                Modifiers.setRule(ruleName, filterNames, locations, targets, options);

                msg.channel.send(`"${ruleName}" rule made:\n${formatRule({ ruleName, filterNames, locations, targets, options })}`)
                break;
            case "get":
                switch (args[1]) {
                    case "*":
                        msg.channel.send(`\`\`\`${Modifiers.getRuleNames().join(", ")}\`\`\``);

                        break;
                    default:
                        const rule = Modifiers.rules[Modifiers.getRuleNames().indexOf(args[1])];

                        if (rule) {
                            msg.channel.send(formatRule(rule));
                        } else {
                            msg.channel.send(`"${args[1]}" rule not found.`);
                        }

                        break;
                }
                break;
            case "delete":
                Modifiers.deleteRule(args[1]);
                msg.channel.send(`"${args[1]}} rule deleted."`)
                break;
        }
    }
};

function formatRule(rule) {
    return `\`\`\`
Rule name:
    ${rule.ruleName}

Filters:
    ${rule.filterNames.join("\n\t")}

Channels:
    ${rule.locations.join("\n\t")}

Targets:
    ${rule.targets.join("\n\t")}

Options: 
    ${Object.entries(rule.options).map(([key, value]) => `${key}=${value}`).join("\n\t")}
\`\`\``;
}
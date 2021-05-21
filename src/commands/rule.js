const Modifiers = require("../Modifiers");

module.exports = {
    name: "rule",
    execute(msg, args) {
        if (!args.length) {
            return;
        }

        switch (args[0]) {
            case "set":
                const ruleName = args[1];
                const filterNames = args[2].split(',');
                const locations = args[3].split(',');
                const targets = args[4].split(',');
                const options = {
                    chance: 1
                }

                args[5].split(',').forEach(optionString => {
                    const [key, value] = optionString.split('=');
                    options[key] = parseFloat(value);
                });

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

Locations:
    ${rule.locations.join("\n\t")}

Targets:
    ${rule.targets.join("\n\t")}

Options: 
    ${Object.entries(rule.options).map(([key, value]) => `${key}=${value}`).join("\n\t")}
\`\`\``;
}
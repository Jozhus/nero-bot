const filterList = require("./FilterList");

module.exports = class Modifiers {
    static rules = [
        {
            ruleName: "test1",
            filterNames: ["uwu", "censor"],
            locations: ["here", "there"],
            targets: ["Jozhus", "you"],
            options: {
                chance: 0.5
            }
        },
        {
            ruleName: "test2",
            filterNames: ["censor"],
            locations: ["here"],
            targets: ["Jozhus"],
            options: {
                chance: 1
            }
        }
    ];

    static getRuleNames() {
        return this.rules.map(rule => rule.ruleName);
    }

    static setRule(ruleName, filterNames, locations, targets, options = { chance: 1 }) {
        let toChange = this.getRuleNames().indexOf(ruleName);
        const newRule = {
            ruleName,
            filterNames,
            locations,
            targets,
            options
        }

        if (~toChange) {
            this.rules[toChange] = newRule
        } else {
            this.rules.push(newRule);
        }
    }

    static deleteRule(ruleName) {
        let found = this.getRuleNames().this.rules.indexOf(ruleName);

        if (~found) {
            this.rules.splice(found, 1);
        }
    }

    static applyFilter(filterName, message) {
        if (filterList[filterName]) {
            message = filterList[filterName].apply(message);
        } else {
            throw new Error(`"${filterName}" filter not found.`);
        }

        return message;
    }

    static getFilters() {
        return filterList.map(filter => filter.name);
    }

    static async enforceRules(msg) {
        let message = msg.content;
        let author = msg.guild.member(msg.author);
        let applied = false;

        this.rules.forEach(rule => {
            if (rule.targets.includes("all") || rule.targets.includes(author.displayName)) {
                rule.filterNames.forEach(filterName => {
                    if (rule.options && rule.options.chance && Math.floor(Math.random() * (1 / rule.options.chance)) === 0) {
                        message = this.applyFilter(filterName, message);
                        applied = true;
                    }
                });
            }
        });

        if (applied) {
            await msg.delete();
        }

        await msg.channel.send(`${author.displayName}: ${message}`);
    }
}
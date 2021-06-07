const db = require("./constants/globals");
const filterList = require("./FilterList");
const merge = require("deepmerge");

module.exports = class Modifiers {
    /*
        {
            rules: {
                [guildId]: {

                }
            }
        }
    */
    static settings = {
        rules: {}
    }

    static getRuleNames(guildId) {
        if (!this.settings.rules[guildId] || !this.settings.rules[guildId].length) {
            return [];
        }

        return this.settings.rules[guildId].map(rule => rule.ruleName);
    }

    static setRule(guildId, ruleName, filterNames, locations, targets, options = { chance: 1 }) {
        let toChange = this.getRuleNames(guildId).indexOf(ruleName);
        const newRule = {
            ruleName,
            filterNames,
            locations,
            targets,
            options
        }

        if (~toChange) {
            this.settings.rules[guildId][toChange] = newRule
        } else {
            if (!this.settings.rules[guildId]) {
                this.settings.rules[guildId] = [];
            }

            this.settings.rules[guildId].push(newRule);
        }

        db.saveSettings(guildId, "Modifiers", this.settings.rules[guildId]);
    }

    static deleteRule(guildId, ruleName) {
        let found = this.getRuleNames(guildId).indexOf(ruleName);

        if (~found) {
            this.settings.rules[guildId].splice(found, 1);
            db.saveSettings(guildId, "Modifiers", this.settings.rules[guildId]);
        }
    }

    static getFilters() {
        return filterList.map(filter => filter.name);
    }

    static applyFilter(filterName, message, options, msg = null) {
        if (filterList[filterName]) {
            message = filterList[filterName].apply(message, options, msg);
        } else {
            throw new Error(`"${filterName}" filter not found.`);
        }

        return message;
    }


    static async enforceRules(msg) {
        let message = msg.content;
        let author = msg.guild.member(msg.author);
        let applied = false;
        const guildId = msg.guild.id;

        if (!this.settings.rules[guildId]) {
            return;
        }

        this.settings.rules[guildId].forEach(rule => {
            if ((rule.locations.includes("global") || rule.locations.includes(msg.channel.name))
                && (rule.targets.includes("all") || rule.targets.includes(author.displayName))) {
                rule.filterNames.forEach(filterName => {
                    if (rule.options && rule.options.chance && Math.floor(Math.random() * (1 / rule.options.chance)) === 0) {
                        message = this.applyFilter(filterName, message, rule.options, msg);
                        applied = message !== msg.content;
                    }
                });
            }
        });

        if (applied) {
            await msg.delete();
            await msg.channel.send(`${author.displayName}: ${message}`);
        }

    }

    static loadSettings(guildId, settings) {
        if (!settings.rules) {
            return;
        }

        const newSettings = { rules: { [guildId]: [] } };

        settings.rules.forEach(rule => {
            newSettings.rules[guildId].push(rule);
        });

        this.settings = merge(this.settings, newSettings);
    }
}
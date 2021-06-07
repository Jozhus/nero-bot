const Censor = require("./filters/censor");
const Text2Emoji = require("./filters/text2emoji");
const ghetto = require("./filters/ghetto");
const Uwuifier = require("./filters/uwu");

module.exports = {
    censor: {
        name: "censor",
        apply(message, options, msg) {
            return Censor.censor(message).replace(new RegExp("\\*", 'g'), '\\*');

        }
    },
    uwu: {
        name: "uwu",
        apply(message, options, msg) {
            return Uwuifier.uwuifySentence(message);
        }
    },
    ghetto: {
        name: "ghetto",
        apply(message, options, msg) {
            return ghetto(message);
        }
    },
    emojify: {
        name: "emojify",
        apply(message, options, msg) {
            try {
                return Text2Emoji.emojify(message).join(' ');
            } catch (err) {
                return err.message;
            }
        }
    },
    reactify: {
        name: "reactify",
        apply(message, options, msg) {
            let reactions;

            reactions = Text2Emoji.emojify(options.text, true);

            reactions.forEach((reaction) => {
                msg.react(reaction);
            })

            return message;
        }
    }
};
const Modifiers = require("../Modifiers");

module.exports = {
    name: "filter",
    description: "Applies the specified translation filters to a given text.",
    usage: `
    !nero filter **\`FILTER NAME(s)\`** **\`TEXT TO TRANSLATE\`**
    *Applies the specified filters to the text.
    Multiple filters can be specified by separating them with a ','. (For list of filters, try !nero get list filters)*`,
    examples: `
    *!nero filter uwu Please don't uwu me*
    *!nero filter ghetto,uwu,censor I'm a cute-ass christian gangster.*`,
    execute(msg, args) {
        if (!args.length) {
            return;
        }

        let message = args.slice(1).join(' ');

        try {
            args[0].split(',').forEach(filterName => {
                message = Modifiers.applyFilter(filterName, message);
            });
        } catch (err) {
            message = err.message;
        }

        msg.channel.send(message);
    }
};
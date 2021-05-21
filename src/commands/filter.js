const Modifiers = require("../Modifiers");

module.exports = {
    name: "filter",
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
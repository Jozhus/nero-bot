const censor = require("../helpers/censorSim");

module.exports = {
    name: "censor",
    execute(msg, args) {
        if (!args.length) {
            return;
        }

        msg.channel.send(censor(args.join(' ')).replace(new RegExp("\\*", 'g'), '\\*'));
    }
};
const ghetto = require("../helpers/ghetto");

module.exports = {
    name: "censor",
    execute(msg, args) {
        if (!args.length) {
            return;
        }

        msg.channel.send(ghetto(args.join(' ')));
    }
};
const Censor = require("../helpers/censorSim");

module.exports = {
    name: "censor",
    execute(msg, args) {
        if (!args.length) {
            return;
        }

        switch (args[0]) {
            case "globalCensor":
                Censor.globalCensor = !Censor.globalCensor;
                msg.channel.send(`Global censor has be turned ${Censor.globalCensor ? "on" : "off"}`);
        }
    }
};
const Toggles = require("../Toggles");

module.exports = {
    name: "censor",
    execute(msg, args) {
        if (!args.length) {
            return;
        }

        switch (args[0]) {
            case "globalCensor":
                Toggles.globalCensor = !Toggles.globalCensor;
                msg.channel.send(`Global censor has be turned ${Toggles.globalCensor ? "on" : "off"}`);
                break;
            case "globalUwu":
                Toggles.globalUwu = !Toggles.globalUwu;
                msg.channel.send(`Global uwu has be turned ${Toggles.globalUwu ? "on" : "off"}`);
                break;
            case "hell":
                Toggles.globalCensor = !Toggles.globalCensor;
                Toggles.globalUwu = !Toggles.globalUwu;
                msg.channel.send(`Hell has be turned ${Toggles.globalUwu ? "on" : "off"}`);
                break;
        }
    }
};
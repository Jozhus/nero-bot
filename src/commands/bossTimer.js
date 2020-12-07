const BossTimer = require("../BossTimer");

module.exports = {
    name: "bossTimer",
    execute(msg, args) {
        if (!args.length) {
            return;
        }

        switch (args[0]) {
            case "start":
                BossTimer.preset(args[1], msg);
                break;
            case "end":
                BossTimer.end(msg);
                break;
            case "sync":
                BossTimer.forceUpdate(msg);
                break;
            case "phase":
                BossTimer.nextPhase(msg);
                break;
        }
    }
};

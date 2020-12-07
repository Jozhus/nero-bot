const VoiceChat = require("../VoiceChat");

module.exports = {
    name: "vc",
    execute(msg, args) {
        if (!args.length) {
            return;
        }

        switch (args[0]) {
            case "join":
                VoiceChat.join(msg);
                break;
            case "leave":
                VoiceChat.leave();
                break;
            case "say":
                break;
        }
    }
};
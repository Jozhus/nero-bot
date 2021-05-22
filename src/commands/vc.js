const VoiceChat = require("../VoiceChat");

module.exports = {
    name: "vc",
    description: "Manage voice chat interactions.",
    usage: `
    !nero vc join
    *Nero will join the voice channel of the user.
    User must be in a voice channel.*

    !nero vc leave
    *Nero will leave the voice channel she is currently in.*

    !nero say **\`TEXT TO SPEAK\`**
    *Nero will speak the given text in the voice channel she is currently in.
    Nero must be in a voice channel.
    Currently disabled because Linux issues.*`,
    examples: `
    *!nero vc join*
    *!nero say Wow text to speech is cool!*
    *!nero leave*`,
    execute(msg, args) {
        if (!args.length) {
            return;
        }

        switch (args[0]) {
            case "join":
                VoiceChat.join(msg);
                break;
            case "leave":
                VoiceChat.leave(msg);
                break;
            case "say":
                VoiceChat.speak(args.slice(1).join(' '), msg);
                break;
        }
    }
};
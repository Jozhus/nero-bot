const BossTimer = require("../BossTimer");

module.exports = {
    name: "bossTimer",
    description: "Keeps track of timing for boss events.",
    usage: `
    !nero bossTimer start **\`BOSS NAME\`**
    *Start a boss timer for the specified boss if it exists.*

    !nero bossTimer end
    *Ends the current boss timer.*

    !nero bossTimer sync
    *Syncs the current boss timer to the most recent phase.
    This is mainly for when the game servers start to desync from the timer.*

    !nero bossTimer phase
    *Moves the boss timer to the next phase of the boss.*

    !nero bossTimer tts
    *Toggles text2speech.
    Nero must be in a voice channel to use. (See !nero help vc)*`,
    examples: `
    *!nero bossTimer start Will*
    *!nero bossTimer sync*
    *!nero bossTimer phase*
    *!nero bossTimer tts*
    *!nero bossTimer end*`,
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
            case "tts":
                BossTimer.toggleTTS(msg);
                break;
        }
    }
};
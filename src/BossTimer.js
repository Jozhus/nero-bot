const presets = require("./constants/bossTimerPresets");

module.exports = class BossTimer {
    static duration = 0;
    static time = 0;
    static totalTime = 0;
    static interval = null;
    static bossName = "";
    static phase = -1;
    static tts = false;

    static preset(boss, msg) {
        if (!presets[boss]) {
            this.logAndMessage("No boss preset found with that name!", msg);
            return;
        }

        if (this.interval) {
            this.end();
        }

        this.logAndMessage("Boss timer started.", msg);

        this.bossName = boss;
        this.nextPhase(msg);
        this.interval = setInterval(() => { this.tick(msg) }, 1000);
    }

    static tick(msg) {
        this.time++;
        this.totalTime++;
        let [message, isFinished] = presets[this.bossName][this.phase].tick(this.timeLeft, this.totalTime);

        if (message) {
            this.logAndMessage(message, msg);
        }

        if (isFinished) {
            if (presets[this.bossName][this.phase].loop) {
                this.time = 0;
            } else {
                this.nextPhase(msg);
            }
        }
    }

    static forceUpdate(msg) {
        if (!this.interval) {
            this.logAndMessage("There is currently no boss timer active.", msg);
            return;
        }

        this.logAndMessage("Boss timer has been synced.", msg);

        this.time = 0;
    }

    static nextPhase(msg) {
        this.phase++;

        if (this.phase >= presets[this.bossName].length) {
            this.end(msg);
            return;
        }

        this.logAndMessage(presets[this.bossName][this.phase].phaseDescription, msg);

        this.duration = presets[this.bossName][this.phase].duration;
        this.time = 0;
    }

    static end(msg) {
        if (this.interval) {
            clearInterval(this.interval);
        }

        this.logAndMessage("Boss timer ended.", msg);

        this.duration = 0;
        this.time = 0;
        this.totalTime = 0;
        this.interval = null;
        this.bossName = "";
        this.phase = -1;
    }

    static toggleTTS(msg) {
        this.tts = !this.tts;

        this.logAndMessage(`Text to speech turned ${this.tts ? "on" : "off"}.`, msg);
    }

    static get timeLeft() {
        return this.interval ? this.duration - this.time : 0;
    }

    static logAndMessage(message, msg) {
        console.log(message);

        if (msg) {
            msg.channel.send(message, { tts: this.tts });
        }
    }
}
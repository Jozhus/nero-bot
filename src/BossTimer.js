const presets = {
    "will": [
        {
            phaseDescription: "> Watching cutscene",
            duration: 10,
            loop: false,
            tick(timeLeft) {
                let [message, isFinished] = ["", false];

                if (timeLeft === 0) {
                    isFinished = true;
                }

                return [message, isFinished];
            }
        },
        {
            phaseDescription: "> Waiting for first phase 1 crack",
            duration: 15, // TODO: Figure out cutscene + time till first crack.
            loop: false,
            tick(timeLeft) {
                let [message, isFinished] = ["", false];

                if (timeLeft === 0) {
                    isFinished = true;
                }

                return [message, isFinished];
            }
        },
        {
            phaseDescription: "> Phase 1 exams",
            duration: 120,
            loop: true,
            tick(timeLeft) {
                let [message, isFinished] = ["", false];

                switch (timeLeft) {
                    case 15:
                        message = "15 seconds left until next crack.";
                        break;
                    case 10:
                        message = "10 seconds left until next crack.";
                        break;
                    case 0:
                        message = "Crack!";
                        isFinished = true;
                        break;
                }

                return [message, isFinished];
            }
        },
        {
            phaseDescription: "> Waiting for first phase 2 exam",
            duration: 0,
            loop: true,
            tick(timeLeft) {
                let [message, isFinished] = ["", false];

                if (timeLeft === 0) {
                    isFinished = true;
                }

                return [message, isFinished];
            }
        },
        {
            phaseDescription: "> Phase 2 exams",
            duration: 120,
            loop: true,
            tick(timeLeft) {
                let [message, isFinished] = ["", false];

                switch (timeLeft) {
                    case 15:
                        message = "15 seconds left until next test.";
                        break;
                    case 10:
                        message = "10 seconds left until next test.";
                        break;
                    case 0:
                        message = "Test!";
                        isFinished = true;
                        break;
                }

                return [message, isFinished];
            }
        }
    ]
}

module.exports = class BossTimer {
    static duration = 0;
    static elapsedTime = 0;
    static interval = null;
    static bossName = "";
    static phase = -1;

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
        this.elapsedTime++;
        let [message, isFinished] = presets[this.bossName][this.phase].tick(this.timeLeft);

        if (message) {
            this.logAndMessage(message, msg);
        }

        if (isFinished) {
            if (presets[this.bossName][this.phase].loop) {
                this.elapsedTime = 0;
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

        this.elapsedTime = 0;
    }

    static nextPhase(msg) {
        this.phase++;

        if (this.phase >= presets[this.bossName].length) {
            this.end(msg);
            return;
        }

        this.logAndMessage(presets[this.bossName][this.phase].phaseDescription, msg);

        this.duration = presets[this.bossName][this.phase].duration;
        this.elapsedTime = 0;
    }

    static end(msg) {
        if (this.interval) {
            clearInterval(this.interval);
        }

        this.logAndMessage("Boss timer ended.", msg);

        this.duration = 0;
        this.elapsedTime = 0;
        this.interval = null;
        this.bossName = "";
        this.phase = -1;
    }

    static get timeLeft() {
        return this.interval ? this.duration - this.elapsedTime : 0;
    }

    static logAndMessage(message, msg) {
        console.log(message);

        if (msg) {
            msg.channel.send(message);
        }
    }

}
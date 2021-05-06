const formatTime = require("../helpers/formatTime");

module.exports = {
    "will": [
        {
            phaseDescription: "> Watching cutscene",
            duration: 11, // It's around 10 - 12 seconds.
            loop: false,
            tick(timeLeft, totalTime) {
                let [message, isFinished] = ["", false];

                if (timeLeft === 0) {
                    isFinished = true;
                }


                return [message, isFinished];
            }
        },
        {
            phaseDescription: "> Waiting for first phase 1 crack",
            duration: 60, // The first crack is around 28:48
            loop: false,
            tick(timeLeft, totalTime) {
                let [message, isFinished] = ["", false];

                switch (timeLeft) {
                    case 59:
                        message = `First crack is at ${formatTime(1800 - (totalTime + 60))}.`;
                        break;
                    case 20:
                        message = `20 seconds.`;
                        break;
                    case 10:
                        message = `10 seconds.`;
                        break;
                    case 0:
                        isFinished = true;
                        break;
                }

                return [message, isFinished];
            }
        },
        {
            phaseDescription: "> Phase 1 exams",
            duration: 120,
            loop: true,
            tick(timeLeft, totalTime) {
                let [message, isFinished] = ["", false];

                switch (timeLeft) {
                    case 119:
                        message = `Next crack is at ${formatTime(1800 - (totalTime + 120))}.`;
                        break;
                    case 20:
                        message = `20 seconds.`;
                        break;
                    case 10:
                        message = `10 seconds.`;
                        break;
                    case 0:
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
            tick(timeLeft, totalTime) {
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
            tick(timeLeft, totalTime) {
                let [message, isFinished] = ["", false];

                switch (timeLeft) {
                    case 119:
                        message = `Next test is at ${formatTime(1800 - (totalTime + 120))}.`;
                        break;
                    case 20:
                        message = `20 seconds.`;
                        break;
                    case 10:
                        message = `10 seconds.`;
                        break;
                    case 0:
                        isFinished = true;
                        break;
                }

                return [message, isFinished];
            }
        }
    ]
}
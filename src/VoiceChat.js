const say = require("say");
const fs = require("fs").promises;
const logAndMessage = require("./helpers/logAndMessage");
const tempPath = "./sounds/temp/";

module.exports = class VoiceChat {
    static connection = null;
    static reading = false;
    static leaving = false;
    static joining = false;

    static async join(msg) {
        if (!msg.member.voice.channel) {
            logAndMessage("You're not in a voice channel for me to join!", msg);
            return;
        }

        if (this.joining || this.leaving) {
            return;
        }

        this.joining = true;

        try {
            this.connection = await msg.member.voice.channel.join();
        } catch (err) {
            // Might need permission to enter voice channel.
            console.error(err);
        }

        this.joining = false;
        this.speak("Hello!", msg);
    }

    static leave(msg) {
        if (!this.connection || this.joining) {
            logAndMessage("I'm not in a voice channel!", msg);
            return;
        }

        try {
            // This is a VERY CUTE bot.
            this.speak("Bye bye!", msg);
        } catch (err) {
            console.err(err);
        }

        this.leaving = true;
        setTimeout(() => {
            this.connection.disconnect();
            this.connection = null;
            this.leaving = false;
        }, 3000);
    }

    static speak(message, msg) {
        if (!this.connection) {
            logAndMessage("I'm currently not in any voice channel to speak this.", msg);
            return;
        } else if (this.leaving || this.joining) {
            return;
        }

        const timestamp = new Date().getTime();
        const soundPath = `./sounds/temp/${timestamp}.wav`;

        return new Promise((resolve, reject) => {
            say.export(message, null, 1, soundPath, (err) => {
                if (err) {
                    console.error(err);
                    reject(err);
                    return;
                }

                this.connection.play(soundPath)
                    .on('finish', () => {
                        this.clearTemp();
                        resolve();
                    })
                    .on('error', (err) => {
                        this.connection.disconnect();
                        this.clearTemp();
                        reject(err);
                    });
            });
        })
    }

    static clearTemp() {
        fs.rmdir(tempPath, { recursive: true })
            .then(() => {
                return fs.mkdir(tempPath);
            })
            .catch(err => {
                console.err(err);
            });
    }
}
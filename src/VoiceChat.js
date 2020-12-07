module.exports = class VoiceChat {
    static connection = null;

    static async join(msg) {
        if (!msg.member.voice.channel) {
            msg.reply("You're not in a voice channel for me to join");
            return;
        }

        this.connection = await msg.member.voice.channel.join();
    }

    static leave() {
        if (this.connection) {
            this.connection.disconnect();
            this.connection = null;
        }
    }

    static say(msg, message) {

    }
}
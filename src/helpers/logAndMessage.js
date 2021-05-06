module.exports = function logAndMessage(message, msg) {
    console.log(message);

    if (msg) {
        msg.channel.send(message);
    }
}
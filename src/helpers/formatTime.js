module.exports = function formatTime(seconds) {
    var date = new Date(0);
    date.setSeconds(seconds);
    return date.toISOString().substr(14, 5);
};
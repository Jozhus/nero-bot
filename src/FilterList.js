const Censor = require("./filters/censor");
const ghetto = require("./filters/ghetto");
const Uwuifier = require("./filters/uwu");

module.exports = {
    censor: {
        name: "censor",
        apply(message) {
            return Censor.censor(message).replace(new RegExp("\\*", 'g'), '\\*');

        }
    },
    uwu: {
        name: "uwu",
        apply(message) {
            return Uwuifier.uwuifySentence(message);
        }
    },
    ghetto: {
        name: "ghetto",
        apply(message) {
            return ghetto(message);
        }
    }
};
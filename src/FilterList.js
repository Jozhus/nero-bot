const Censor = require("./helpers/censor");
const ghetto = require("./helpers/ghetto");
const Uwuifier = require("uwuifier");
const uwuifier = new Uwuifier();

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
            return uwuifier.uwuifySentence(message);
        }
    },
    ghetto: {
        name: "ghetto",
        apply(message) {
            return ghetto(message);
        }
    }
};
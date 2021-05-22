const checkListText = require("../constants/preBossChecklist");

module.exports = {
    name: "checklist",
    description: "Prints the pre-boss checklist.",
    usage: `
    !nero checklist
    *Prints the pre-boss checklist*`,
    examples: `
    *!nero checklist*`,
    execute(msg, args) {
        msg.channel.send(checkListText);
    }
};

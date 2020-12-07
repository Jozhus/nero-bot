const checkListText = require("../constants/preBossChecklist");

module.exports = {
    name: "checklist",
    execute(msg, args) {
        msg.channel.send(checkListText);
    }
};

const curses = require("../constants/curses");
const notCurses = require("../constants/whitelist");
const stars = "*,./;:'\"\\-_=+`~!^ ";

module.exports = function (original) {
    let stripped = original;

    Array.from(stars).forEach(star => stripped = stripped.replace(new RegExp(`\\${star}`, 'g'), ''));

    let replaced = stripped;

    // This is dumb
    if (notCurses.some(nurse => stripped.toLowerCase().includes(nurse.toLowerCase()))) {
        notCurses.forEach(nurse => {
            if (stripped.toLowerCase().includes(nurse.toLowerCase())) {
                replaced = stripped.toLowerCase().split(nurse.toLowerCase()).map(substr => {
                    replacedSubstr = substr;

                    curses.forEach(curse => {
                        if (stripped.toLowerCase().includes(curse.toLowerCase())) {
                            replacedSubstr = replacedSubstr.replace(new RegExp(curse, "ig"), "\\*".repeat(curse.length));
                        }
                    })

                    return replacedSubstr;
                }).join(nurse.toLowerCase());
            }
        });
    } else {
        curses.forEach(curse => {
            if (stripped.toLowerCase().includes(curse.toLowerCase())) {
                replaced = replaced.replace(new RegExp(curse, "ig"), "\\*".repeat(curse.length));
            }
        })
    }

    Array.from(original).forEach((char, i) => {
        while (char !== stripped[i]) {
            replaced = replaced.slice(0, i) + char + replaced.slice(i);
            stripped = stripped.slice(0, i) + char + stripped.slice(i);
        }
    });

    return replaced;
}
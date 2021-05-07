const curses = require("../constants/curses");
const notCurses = require("../constants/whitelist");
const stars = "*,./;:'\"\\-_=+`~!^ ";

module.exports = class CensorSim {
    static isObscene(original) {
        if (notCurses.some(nurse => original.toLowerCase().includes(nurse.toLowerCase()))) {
            notCurses.forEach(curse => {
                original = original.replace(new RegExp(curse, "ig"), ')');
            });
        }

        return (curses.some(curse => original.toLowerCase().includes(curse.toLowerCase())));
    }

    static censor(original) {
        let placement = "";
        let stripped = original;

        Array.from(stars).forEach(star => stripped = stripped.replace(new RegExp(`\\${star}`, 'g'), ''));

        placement = Array.from(original).map(char => (stars.includes(char) ? char : '(')).join('');
        let replaced = stripped;

        // This is dumb
        if (notCurses.some(nurse => stripped.toLowerCase().includes(nurse.toLowerCase()))) {
            notCurses.forEach(nurse => {
                if (stripped.toLowerCase().includes(nurse.toLowerCase())) {
                    replaced = stripped.toLowerCase().split(nurse.toLowerCase()).map(substr => {
                        replacedSubstr = substr;

                        curses.forEach(curse => {
                            if (stripped.toLowerCase().includes(curse.toLowerCase())) {
                                replacedSubstr = replacedSubstr.replace(new RegExp(curse, "ig"), "*".repeat(curse.length));
                            }
                        })

                        return replacedSubstr;
                    }).join(nurse.toLowerCase());
                }
            });
        } else {
            curses.forEach(curse => {
                if (stripped.toLowerCase().includes(curse.toLowerCase())) {
                    replaced = replaced.replace(new RegExp(curse, "ig"), "*".repeat(curse.length));
                }
            })
        }

        Array.from(placement).forEach((char, i) => {
            if (char !== '(') {
                replaced = replaced.slice(0, i) + char + replaced.slice(i);
            }
        });

        return replaced;
    }
};
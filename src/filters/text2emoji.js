const unicodeEmoji = require("../constants/emojiName2Unicode.json");

const symbols = {
    '!': "exclamation",
    '#': "hash",
    '$': "heavy_dollar_sign",
    '^': "arrow_up_small",
    '*': "asterisk",
    '?': "question",
    '+': "heavy_plus_sign",
    '-': "heavy_minus_sign",
    '%': "heavy_division_sign",
}

const alts = {
    'a': [
        'a',
        "four"
    ],
    'b': [
        'b'
    ],
    'c': [
        "copyright"
    ],
    'e': [
        "three"
    ],
    'g': [
        "nine"
    ],
    'i': [
        "information_source",
        "one"
    ],
    'l': [
        "one"
    ],
    'm': [
        'm'
    ],
    'o': [
        "o2",
        "o",
        "zero"
    ],
    'p': [
        "parking"
    ],
    'r': [
        "registered"
    ],
    's': [
        "heavy_dollar_sign",
        "five"
    ],
    't': [
        "seven"
    ],
    'x': [
        "negative_squared_cross_mark",
        "heavy_multiplication_x"
    ],
    '!': [
        "grey_exclamation",
        "warning",
        "bangbang"
    ],
    '?': [
        "grey_question"
    ],
    '*': [
        "eight_spoked_asterisk"
    ],
    '^': [
        "small_red_triangle"
    ]
};

const numbers = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];

module.exports = class Text2Emoji {
    static emojify(text, unique = false) {
        let output = [];

        text.split('').forEach((char, i) => {
            let replaced = char;

            if (char.toLocaleLowerCase() >= 'a' && char.toLocaleLowerCase <= 'z') {
                replaced = unicodeEmoji[`regional_indicator_${char.toLocaleLowerCase()}`];
            } else if (char >= '0' && char <= '9') {
                replaced = unicodeEmoji[numbers[parseInt(char)]];
            } else {
                if (!symbols[char]) {
                    throw new Error(`No emoji found for '${char}'.`);
                }

                replaced = unicodeEmoji[symbols[char]];
            }

            // Try alternatives to make unique.
            if (unique && output.includes(replaced)) {
                if (!alts[char.toLocaleLowerCase()] || alts[char.toLocaleLowerCase()].every(alt => {
                    const isUsed = output.includes(unicodeEmoji[alt]);

                    if (!isUsed) {
                        replaced = unicodeEmoji[alt];
                    }

                    return isUsed;
                })) {
                    throw new Error(`Cannot make text into emojis uniquely.\n${text.substring(0, i)}__**${char}**__${text.substring(i + 1)}`);
                }
            }

            output.push(replaced);
        });

        return output;
    }
}
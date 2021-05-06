const answers = [
    "Surely!", "No.", "Yes.", "Definitely not.", "Ask again later.", "Future unclear.", "Maybe.", "As I see it, yes",
    "Better not tell you now.", "Cannot predict now.", "Concentrate and ask again.", "Don't count on it.", "It is certain.",
    "It is decidedly so.", "Most likely.", "My reply is no.", "My sources say no.", "Outlook not so good.", "Outlook good.",
    "Reply hazy, try again.", "Signs port to yes.", "Very doubtful.", "Without a doubt."
]

module.exports = {
    name: "ask",
    execute(msg, args) {
        if (!args.length) {
            return;
        }

        msg.channel.send(answers[Math.floor(Math.random() * answers.length)]);

        /*switch (args.join(' ')) {
            case "is today the day?":
                msg.channel.send(answers[Math.floor(Math.random() * answers.length)]);
                break;
        }*/
    }
};
const answers = [
    "Surely!", "No.", "Yes.", "Definitely not.", "Ask again later.", "Future unclear.", "Maybe.", "As I see it, yes",
    "Better not tell you now.", "Cannot predict now.", "Concentrate and ask again.", "Don't count on it.", "It is certain.",
    "It is decidedly so.", "Most likely.", "My reply is no.", "My sources say no.", "Outlook not so good.", "Outlook good.",
    "Reply hazy, try again.", "Signs point to yes.", "Very doubtful.", "Without a doubt."
]

module.exports = {
    name: "ask",
    description: "Ask Nero a yes or no question about the future.",
    usage: `
    !nero ask **\`QUESTION\`**
    *Ask a question.*`,
    examples: `
    *!nero ask Is today the day?*`,
    execute(msg, args) {
        if (!args.length) {
            return;
        }

        msg.channel.send(answers[Math.floor(Math.random() * answers.length)]);
    }
};

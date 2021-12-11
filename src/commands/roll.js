module.exports = {
    name: "roll",
    description: "Nero will roll an n-sided dice for you",
    usage: `
    !nero roll **\`MAX NUMBER\`**
    *Generates a random number between 1 and the number provided.
    If no number is provided, the default is 100.
    *`,
    examples: `
    *!nero roll 20*
    *!nero roll*`,
    execute(msg, args) {
        msg.channel.send(`${msg.guild.member(msg.author).displayName} rolled a **${Math.floor(Math.random() * (parseInt(args[0]) || 100) + 1)}**!`);
    }
};

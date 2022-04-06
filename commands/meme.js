const Discord = require("discord.js");

const randomPuppy = require("random-puppy");

module.exports = {
    name: "meme",
    description: "Sends a random meme from dankmeme meme and meme_irl subReddits",
    execute: async (message) => {
    const subReddits = ["dankmeme", "meme", "me_irl"];
    const random = subReddits[Math.floor(Math.random() * subReddits.length)];

    const img = await randomPuppy(random);
        const embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
        .setTitle(`From /r/${random}`)
        .setURL('https://reddit.com/r/${random}')
            .setImage(img);

        message.channel.send(embed)
}
}
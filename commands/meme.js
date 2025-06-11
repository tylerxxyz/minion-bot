const { EmbedBuilder } = require("discord.js");
const randomPuppy = require("random-puppy");

module.exports = {
  name: "meme",
  description: "Sends a random meme from dankmeme, meme, and me_irl subreddits",
  execute: async (message) => {
    try {
      const subReddits = ["dankmeme", "meme", "me_irl"];
      const random = subReddits[Math.floor(Math.random() * subReddits.length)];
      
      const img = await randomPuppy(random);

      const embed = new EmbedBuilder()
        .setColor("Random")
        .setTitle(`From /r/${random}`)
        .setURL(`https://reddit.com/r/${random}`)
        .setImage(img);

      await message.channel.send({ embeds: [embed] });
    } catch (error) {
      console.error(error);
      message.channel.send("Failed to fetch a meme, try again later!");
    }
  },
};

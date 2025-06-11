const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "suggest",
  description: "Suggest stuff",
  execute: async (message) => {
    const args = message.content.split(" ").slice(1);
    if (!args[0]) {
      return message.channel.send("Hey! To suggest something you need to send something! (!suggest <suggestion>)");
    }

    const embed = new EmbedBuilder()
      .setColor("Random")
      .addFields({ name: "Suggestion:", value: args.join(" "), inline: true })
      .setFooter({ text: `Requested by ${message.author.tag}` })
      .setTimestamp();

    // Make sure your client instance is accessible here, e.g., passed or imported
    const client = message.client;

    const channel = client.channels.cache.get("887205004870582284");
    if (!channel) {
      return message.channel.send("Suggestion channel not found.");
    }

    try {
      const sentMessage = await channel.send({ embeds: [embed] });
      await sentMessage.react("⬆");
      await sentMessage.react("⬇");
      message.channel.send("Your suggestion has been successfully sent.");
    } catch (error) {
      console.error(error);
      message.channel.send("Failed to send suggestion.");
    }
  },
};

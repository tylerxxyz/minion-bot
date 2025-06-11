const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "embed",
  description: "Create a custom embed with parameters",

  execute: (message) => {
    const content = message.content;

    // Show help embed if no "title:" keyword found
    if (!content.includes("title: ")) {
      const embedHelp = new EmbedBuilder()
        .setColor("#0099ff")
        .setTitle("Embed Command Help")
        .setDescription(
          "Invalid command usage; please try it like this:\n" +
          "`!embed title: <title> description: <description> footer: <footer> author: <author> image: <image> color: <hexcolor>`\n" +
          "Example:\n" +
          "!embed title: Launch day description: Our bot is live! footer: Your Nan author: Announcement image: https://tenor.com/view/rip-juice-cry-cat-kitten-tears-gif-15751834 color: #008080"
        )
        .setTimestamp()
        .setFooter({ text: "Custom embed command" });

      return message.channel.send({ embeds: [embedHelp] });
    }

    // Function to extract text between two keywords (or end of string)
    const extractValue = (startKey, nextKeys = []) => {
      let startIndex = content.indexOf(startKey);
      if (startIndex === -1) return null;
      startIndex += startKey.length;

      // Find earliest next key occurrence after startIndex
      let endIndex = content.length;
      for (const key of nextKeys) {
        const idx = content.indexOf(key, startIndex);
        if (idx !== -1 && idx < endIndex) endIndex = idx;
      }

      return content.slice(startIndex, endIndex).trim();
    };

    // Extract fields
    const title = extractValue("title: ", ["description:", "footer:", "author:", "image:", "color:"]);
    const description = extractValue("description: ", ["footer:", "author:", "image:", "color:"]);
    const footer = extractValue("footer: ", ["author:", "image:", "color:"]);
    const author = extractValue("author: ", ["image:", "color:"]);
    const image = extractValue("image: ", ["color:"]);
    const color = extractValue("color: ") || "#008080";

    // Build embed
    const embed = new EmbedBuilder().setColor(color);

    if (title) embed.setTitle(title);
    if (description) embed.setDescription(description);
    if (footer) embed.setFooter({ text: footer });
    if (author) embed.setAuthor({ name: author });
    if (image) embed.setImage(image);

    return message.channel.send({ embeds: [embed] });
  },

  setCommands: (newCommands) => {
    commands = newCommands;
  }
};

const { EmbedBuilder } = require("discord.js");

let commands = {}; // to be set by setCommands

module.exports = {
  name: "help",
  description: "Soft's kitten command page",

  execute: (message) => {
    // Build a list of commands with their descriptions
    const commandList = Object.values(commands).map(cmd => `**${cmd.name}**: ${cmd.description}`).join("\n") || "No commands found.";

    const embed = new EmbedBuilder()
      .setColor("#0099ff")
      .setTitle("Soft's kitten command page")
      .setDescription(commandList)
      .setThumbnail("https://cdn.discordapp.com/attachments/945984639879749682/961183453217452042/iateurchetos.png?size=4096")
      .setTimestamp()
      .setFooter({ text: "Soft's kitten made by Soft" });

    message.channel.send({ embeds: [embed] });
  },

  setCommands: (newCommands) => {
    commands = newCommands;
  }
};

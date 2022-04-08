const Discord = require("discord.js");
const fs = require("fs");



module.exports = {
  name: "help",
  description: "Soft's kitten command page",
  execute: (message) => {
    const embed = new Discord.MessageEmbed()
      .setColor("#0099ff")
      .setTitle("Soft's kitten command page")
      .setDescription(commands.name)
        .addfield(commands.name, "Soft's kitten command page")
      .setThumbnail("https://cdn.discordapp.com/attachments/945984639879749682/961183453217452042/iateurchetos.png?size=4096")
      .setTimestamp()
      .setFooter("Soft's kitten made by Soft")

    message.channel.send(embed);
  },
  setCommands: (newCommands) => {
    commands = newCommands;
  }
}
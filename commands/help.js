const Discord = require("discord.js");

const { prefix } = require("../config.js");

let commands = {};

module.exports = {
  name: "help",
  description: "Wilbur Help",
  execute: (message, args) => {
    const embed = new Discord.MessageEmbed()
      .setColor("#0099ff")
      .setTitle("Wilbur Soot Help")
      .setDescription(`No`)
      .setThumbnail("https://www.famousbirthdays.com/faces/soot-wilbur-image.jpg")
      .setTimestamp()
      .setFooter("Wilbur Soot Bot By Cruz")

    message.channel.send(embed);
  },
  setCommands: (newCommands) => {
    commands = newCommands;
  }
}
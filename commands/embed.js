const Discord = require("discord.js");


module.exports = {
  name: "embed",
  description: "embed command",
  execute: (message) => {
    const embed = new Discord.MessageEmbed()
      .setColor("#0099ff")
      .setTitle(message.content.split("title:").join(" ").replace("!embed ", ""))
        .setDescription(message.content.split("description:").join(" ").replace("!embed ", ""))
      .setThumbnail("https://cdn.discordapp.com/attachments/945984639879749682/961183453217452042/iateurchetos.png?size=4096")
      .setTimestamp()
      .setFooter("help")

    message.channel.send(embed);
  }
}
const Discord = require("discord.js");

let commands = {};

module.exports = {
  name: "embed",
  description: "embed command",
  execute: (message) => {
    const embedhelp = new Discord.MessageEmbed()
        .setColor("#0099ff")
        .setTitle("Embed Command")
        .setDescription("Invalid command execution; please try it like this instead.:\n" +
            "!embed title: <title> description: <description> footer: <footer> author: <author> image: <image> \n" +
            "Example: !embed title: today we are finaly launching our own bot description: hey guys ive been working on making footer: your nan author: announcement image: https://tenor.com/view/rip-juice-cry-cat-kitten-tears-gif-15751834 \\n\"")
        .setTimestamp()
        .setFooter("custom embed command");
    const embed = new Discord.MessageEmbed()
    if(message.content.split("title: ")[1]) {
      embed.setTitle(message.content.split("title: ")[1].split("description: ")[0].split("footer: ")[0].split("author: ")[0].split("color: ")[0].split("image: ")[0].split("fields: ")[0])
    }else{ embed.setTitle("") }
    if(message.content.split("description: ")[1]) {
      embed.setDescription(message.content.split("description: ")[1].split("footer: ")[0].split("author: ")[0].split("color: ")[0].split("image: ")[0].split("fields: ")[0])
    }else{ embed.setDescription("") }
    if(message.content.split("footer: ")[1]) {
      embed.setFooter(message.content.split("footer: ")[1].split("author: ")[0].split("color: ")[0].split("image: ")[0].split("fields: ")[0])
    }else{ embed.setFooter("") }
    if(message.content.split("author: ")[1]) {
      embed.setAuthor(message.content.split("author: ")[1].split("color: ")[0].split("fields: ")[0])
    }else{ embed.setAuthor("") }
    if(message.content.split("color: ")[1]) {
      embed.setColor(message.content.split("color: ")[1].split("image: ")[0].split("fields: ")[0])
    }else{ embed.setColor("#008080") }
    if(message.content.split("image: ")[1]) {
      embed.setImage(message.content.split("image: ")[1].split("fields: ")[0])
    }else{ return}
        if(!message.content.includes("title: ")){
          message.channel.send(embedhelp)
        }else{message.channel.send(embed);}
  },
  setCommands: (newCommands) => {
    commands = newCommands;
  }
}
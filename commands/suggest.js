const Discord = require("discord.js");

module.exports = {
    name: "suggest",
    description: "Suggest stuff",
    execute: async (message) => {
        let args = message.content
            .split(" ")
            .slice(1)
        if(!args[0]) return message.channel.send("Hey! To suggest something you need to send something! (!suggest <suggestion>)")
        const reportlog = new Discord.MessageEmbed()
            .setTitle('')
            .setColor('RANDOM')
            .addField(
                'Suggestion:',
                args.join(" "), true )
            .setDescription("")
            .setFooter(`Requested by ${message.author.tag}`)
            .setTimestamp()
        client.channels.cache.get('887205004870582284').send(reportlog).then (sentMessage => {
            sentMessage.react("⬆")
            sentMessage.react("⬇")
        })
        message.channel.send("Your Suggestion has been succesfully been sent.")
    }
}
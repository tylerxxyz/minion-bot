const Discord = require("discord.js");


module.exports = {
    name: "kick",
    description: "kick someone",
    execute: async (message, args) => {
        const kickmember = message.mentions.members.first();
        let reason = args.slice(1)
            const nopermissions = new Discord.MessageEmbed()
                .setColor("48BE89")
                .setDescription("Missing Permisions:\n" +
                    "ADMINISTRATOR\n")
                .setFooter("")
                .setTimestamp()

            const banyourslef = new Discord.MessageEmbed()
                .setColor("48BE89")
                .setDescription("Ah ah ah :Thonk: \n" +
                    "You cannot kick yourself.")
                .setFooter("")
                .setTimestamp()

            const highperm = new Discord.MessageEmbed()
                .setColor("48BE89")
                .setDescription("This user cannot be kicked\n" +
                    ":/")
                .setFooter("")
                .setTimestamp()

        const failedkick = new Discord.MessageEmbed()
            .setColor("48BE89")
            .setDescription("Invalid command execution; please try it like this instead.:\n" +
                "!kick <@user> <reason> \n" +
                "Example: !kick @user#1234 spamming")
            .setFooter("")
            .setTimestamp()


            const kicked = new Discord.MessageEmbed()
                .setColor("48BE89")
                .setDescription(" ✅" + kickmember + "  was kicked | reason:" + reason)
                .setFooter("")
                .setTimestamp()

            if (message.member.hasPermission("KICK_MEMBERS")) {
                if (kickmember == null) {
                    message.channel.send(failedkick)
                } else {
                    if (message.mentions.members.first() === message.member) {
                        message.channel.send(banyourslef)
                    } else {
                        if (message.mentions.members.first().hasPermission("ADMINISTRATOR")) {
                            message.channel.send(highperm)
                        } else {
                            if (!kickmember == null) {
                                kickmember.kick(reason);
                                message.channel.send(kicked)
                            } else {
                                message.channel.send(nopermissions)
                            }
                        }
                    }
                }
            }
        }
}
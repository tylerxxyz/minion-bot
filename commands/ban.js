const Discord = require("discord.js");

module.exports = {
    name: "ban",
    description: "ban someone",
    execute: async (message, args) => {
        const banmemmber = message.mentions.members.first();
        let reason = args.slice(1)
            const banyourslef2 = new Discord.MessageEmbed()
                .setColor("48BE89")
                .setDescription("Ah ah ah  \n" +
                    "You cannot ban yourself.")
                .setFooter("")
                .setTimestamp()

            const highpermban = new Discord.MessageEmbed()
                .setColor("48BE89")
                .setDescription("This user cannot be banned.\n" +
                    ":/")
                .setFooter("")
                .setTimestamp()

            const failedban = new Discord.MessageEmbed()
                .setColor("48BE89")
                .setDescription("Invalid command execution; please try it like this instead.:\n" +
                    "!ban <@user> <reason> \n" +
                "Example: !ban @user#1234 spamming")
                .setFooter("")
                .setTimestamp()

            const banned = new Discord.MessageEmbed()
                .setColor("48BE89")
                .setDescription(" ✅" + banmember + "  was banned | reason:" + reason + "")
                .setFooter("")
                .setTimestamp()

            if (message.member.hasPermission("BAN_MEMBERS")) {
                if (banmemmber == null) {
                    message.channel.send(failedban)
                } else {
                    if (message.mentions.members.first() === message.member) {
                        message.channel.send(banyourslef2)
                    } else {
                        if (message.mentions.members.first().hasPermission("ADMINISTRATOR")) {
                            message.channel.send(highpermban)
                        } else {
                            if (!banmemmber == null) {
                                banmemmber.ban(reason);
                                message.channel.send(banned)
                            } else {
                                message.channel.send(nopermissions)
                            }
                        }
                    }
                }
            }
        }
}
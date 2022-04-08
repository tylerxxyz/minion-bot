const Discord = require("discord.js");
let commands = {};

module.exports = {
    name: "warn",
    description: "warn someone",
    execute: async (message, args) => {
        const warnmemmber = message.mentions.members.first();
        let reason = args.slice(1)
        const warnyourself = new Discord.MessageEmbed()
            .setColor("48BE89")
            .setDescription("Ah ah ah  \n" +
                "You cannot warn yourself.")
            .setFooter("")
            .setTimestamp()

        const failedwarn = new Discord.MessageEmbed()
            .setColor("48BE89")
            .setDescription("Invalid command execution; please try it like this instead.:\n" +
                "!warn <@user> <reason> \n" +
                "Example: !warn @user#1234 spamming")
            .setFooter("")
            .setTimestamp()

        const warnned = new Discord.MessageEmbed()
            .setColor("48BE89")
            .setDescription(" ✅" + warnmemmber + "  was warned")
            .setFooter("")
            .setTimestamp()
        const nopermissions = new Discord.MessageEmbed()
            .setColor("48BE89")
            .setDescription("Missing Permisions:\n" +
                "ADMINISTRATOR\n")
            .setFooter("")
            .setTimestamp()



        if (message.member.hasPermission("ADMINISTRATOR")) {
            if (warnmemmber == null) {
                message.channel.send(failedwarn)
            } else {
                if (message.mentions.members.first() === message.member) {
                    message.channel.send(warnyourself)
                } else {
                    if (!warnmemmber == null) {
                        warnmemmber.createDM().then(dm => {
                            dm.send("You have been warned for: " + reason)
                        })
                        message.channel.send(warnned)
                    } else {
                        message.channel.send(nopermissions)
                    }
                }
            }
        }
    },
        setCommands: (newCommands) => {
            commands = newCommands;
        }
        }

const { EmbedBuilder, PermissionsBitField } = require("discord.js");
let commands = {};

module.exports = {
  name: "warn",
  description: "Warn someone",
  execute: async (message, args) => {
    const warnMember = message.mentions.members.first();
    const reason = args.slice(1).join(" ") || "No reason provided";

    const warnYourselfEmbed = new EmbedBuilder()
      .setColor("#48BE89")
      .setDescription("Ah ah ah\nYou cannot warn yourself.")
      .setTimestamp();

    const failedWarnEmbed = new EmbedBuilder()
      .setColor("#48BE89")
      .setDescription(
        "Invalid command execution; please try it like this instead:\n" +
          "!warn <@user> <reason>\n" +
          "Example: !warn @user#1234 spamming"
      )
      .setTimestamp();

    const warnedEmbed = new EmbedBuilder()
      .setColor("#48BE89")
      .setDescription(`✅ ${warnMember} was warned for: ${reason}`)
      .setTimestamp();

    const noPermissionsEmbed = new EmbedBuilder()
      .setColor("#48BE89")
      .setDescription("Missing Permissions:\nADMINISTRATOR")
      .setTimestamp();

    // Check if the message author has ADMINISTRATOR permission
    if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
      return message.channel.send({ embeds: [noPermissionsEmbed] });
    }

    if (!warnMember) {
      return message.channel.send({ embeds: [failedWarnEmbed] });
    }

    if (warnMember.id === message.member.id) {
      return message.channel.send({ embeds: [warnYourselfEmbed] });
    }

    try {
      await warnMember.send(`You have been warned for: ${reason}`);
      await message.channel.send({ embeds: [warnedEmbed] });
    } catch (error) {
      console.error("Failed to send DM:", error);
      message.channel.send("Could not send DM to the user, but they were warned.");
    }
  },

  setCommands: (newCommands) => {
    commands = newCommands;
  },
};

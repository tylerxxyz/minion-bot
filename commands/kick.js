const { EmbedBuilder, PermissionsBitField } = require("discord.js");

module.exports = {
  name: "kick",
  description: "Kick someone",

  execute: async (message, args) => {
    const kickMember = message.mentions.members.first();
    const reason = args.slice(1).join(" ") || "No reason provided";

    const noPermissionsEmbed = new EmbedBuilder()
      .setColor("#48BE89")
      .setDescription("Missing Permissions:\nKICK_MEMBERS")
      .setTimestamp();

    const banYourselfEmbed = new EmbedBuilder()
      .setColor("#48BE89")
      .setDescription("Ah ah ah :Thonk: \nYou cannot kick yourself.")
      .setTimestamp();

    const highPermEmbed = new EmbedBuilder()
      .setColor("#48BE89")
      .setDescription("This user cannot be kicked :/")
      .setTimestamp();

    const failedKickEmbed = new EmbedBuilder()
      .setColor("#48BE89")
      .setDescription(
        "Invalid command execution; please try it like this instead:\n" +
        "`!kick <@user> <reason>`\n" +
        "Example: `!kick @user#1234 spamming`"
      )
      .setTimestamp();

    if (!message.member.permissions.has(PermissionsBitField.Flags.KickMembers)) {
      return message.channel.send({ embeds: [noPermissionsEmbed] });
    }

    if (!kickMember) {
      return message.channel.send({ embeds: [failedKickEmbed] });
    }

    if (kickMember.id === message.member.id) {
      return message.channel.send({ embeds: [banYourselfEmbed] });
    }

    if (kickMember.permissions.has(PermissionsBitField.Flags.Administrator)) {
      return message.channel.send({ embeds: [highPermEmbed] });
    }

    try {
      await kickMember.kick(reason);
      const kickedEmbed = new EmbedBuilder()
        .setColor("#48BE89")
        .setDescription(`✅ **${kickMember.user.tag}** was kicked | Reason: ${reason}`)
        .setTimestamp();

      message.channel.send({ embeds: [kickedEmbed] });
    } catch (error) {
      console.error(error);
      message.channel.send("I was unable to kick that member.");
    }
  },
};

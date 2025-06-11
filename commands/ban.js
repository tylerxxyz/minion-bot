const { EmbedBuilder, PermissionsBitField } = require("discord.js");

module.exports = {
  name: "ban",
  description: "Ban a user from the server",
  execute: async (message, args) => {
    // Check if the command user has ban permissions
    if (!message.member.permissions.has(PermissionsBitField.Flags.BanMembers)) {
      return message.channel.send("❌ You don't have permission to ban members.");
    }

    const banMember = message.mentions.members.first();
    if (!banMember) {
      return message.channel.send({
        embeds: [
          new EmbedBuilder()
            .setColor("#48BE89")
            .setDescription(
              "Invalid command usage.\nUsage: `!ban @user <reason>`\nExample: `!ban @user#1234 spamming`"
            )
            .setTimestamp(),
        ],
      });
    }

    if (banMember.id === message.member.id) {
      return message.channel.send({
        embeds: [
          new EmbedBuilder()
            .setColor("#48BE89")
            .setDescription("Ah ah ah 😅 You cannot ban yourself.")
            .setTimestamp(),
        ],
      });
    }

    if (banMember.permissions.has(PermissionsBitField.Flags.Administrator)) {
      return message.channel.send({
        embeds: [
          new EmbedBuilder()
            .setColor("#48BE89")
            .setDescription("This user cannot be banned. :/")
            .setTimestamp(),
        ],
      });
    }

    const reason = args.slice(1).join(" ") || "No reason provided";

    try {
      await banMember.ban({ reason });
      return message.channel.send({
        embeds: [
          new EmbedBuilder()
            .setColor("#48BE89")
            .setDescription(`✅ ${banMember.user.tag} was banned | Reason: ${reason}`)
            .setTimestamp(),
        ],
      });
    } catch (error) {
      console.error("Failed to ban member:", error);
      return message.channel.send("❌ Failed to ban the user. Make sure I have the right permissions!");
    }
  },
};

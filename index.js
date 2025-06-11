// Import modules
const { Client, GatewayIntentBits, Partials } = require("discord.js");
const fs = require("fs");
require("dotenv").config();

const { setCommands } = require("./commands/help.js");
const { prefix } = require("./config.js");

// Get your token from .env
const token = process.env.DISCORD_TOKEN;

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.MessageContent,
  ],
  partials: [Partials.Channel],
});

const commands = {};

// Load commands dynamically
const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  commands[command.name] = command;
}

setCommands(commands);

// Ready event
client.once("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
  console.log(`${client.user.username} ready!`);

  const activities = ["soft's server"];
  let i = 0;

  setInterval(() => {
    client.user.setActivity(activities[i++ % activities.length], {
      type: "WATCHING",
      url: "https://www.twitch.tv/wilbursoot",
    });
  }, 20000);
});

// Error and warning logging
client.on("warn", console.log);
client.on("error", console.error);

// New member joined
client.on("guildMemberAdd", (member) => {
  const channel = member.guild.channels.cache.get("866178957799325700");
  if (channel) {
    channel.send(`Welcome ${member.user.username} to the soft's lounge! Please read the rules and have fun!`);
  }
});

// Member left
client.on("guildMemberRemove", (member) => {
  const channel = member.guild.channels.cache.get("866178957799325700");
  if (channel) {
    channel.send(`Farewell ${member.user.username}, safe travels!`);
  }
});

// Command handler
client.on("messageCreate", (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  const command = commands[commandName];
  if (!command) return;

  try {
    command.execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply("There was an error executing that command.");
  }
});

// Login
client.login(token);

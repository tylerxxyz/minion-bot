const Discord = require("discord.js");
const fs = require("fs");
require("dotenv").config();




const { setCommands } = require("./commands/help.js")
const { prefix } = require("./config.js");
const { token } = require("./token.gitignore.js");


const client = new Discord.Client();
const commands = {};



// load commands
const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    commands[command.name] = command;
}

setCommands(commands)


// login and status bot
client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
  console.log(`${client.user.username} ready!`)
  let activities = ["soft's server"],i = 0;

  setInterval(() => client.user.setActivity(`${activities[i++ %  activities.length]}`,  {type:"WATCHING",url:"https://www.twitch.tv/wilbursoot"  }), 20000)
})
client.on("warn", (info) => console.log(info));
client.on("error", console.error);

//new member
client.on("guildMemberAdd", () => {
    member.guild.channels.get('#866178957799325700').send("Welcome ${member.user.username} to the soft's lounge! Please read the rules and have fun!")
});
//member leave
client.on("guildMemberRemove", () => {
    member.guild.channels.get('#866178957799325700').send("Farewell ${member.user.username}, safe travels!")
});

  //command system load
client.on("message", message => {
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    let cmd = commands[command];
    if(cmd)
        cmd.execute(message, args)
});

client.login(token);
const Discord = require("discord.js");
const fs = require("fs");
require("dotenv").config();
const randomPuppy = require("random-puppy");




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





//kick
// Kick a single member in the mention
client.on("message", message => {
    //roles
        const ownerRole = "945984579943170049"
        const adminRole = "945984582040313907"
        const modRole = "945984583965478972"

    //embed's
    //kicked
    let args = message.content

    //kick
    if (message.content.startsWith("!kick")){
        let kickmember = message.mentions.members.first();
        let reason = args.slice(1)
        if(message.guild.roles.cache.has(ownerRole) || message.guild.roles.cache.has(adminRole) || message.guild.roles.cache.has(modRole)) {
        message.channel.send("yeah it works")
            const failedkick = new Discord.MessageEmbed()
                .setColor("48BE89")
                .setDescription("Invalid command usage, try using it like:\n" +
                    "/kick [member] (optional reason)\n")
                .setFooter("")
                .setTimestamp()

            const kicked = new Discord.MessageEmbed()
                .setColor("48BE89")
                .setDescription(" ✅" + kickmember + "  was kicked | reason:" + reason)
                .setFooter("")
                .setTimestamp()
            if(kickmember = null){
                message.channel.send(failedkick)
            }else{
            kickmember.kick(reason);
            message.channel.send(kicked)}
        }
    }
})
//guildmemberremove
client.on("guildMemberRemove", () => {
    member.guild.channels.get('#866178957799325700').send("Farewell ${member.user.username}, safe travels!")
});
//guildmemberadd
client.on("guildMemberAdd", () => {
  member.guild.channels.get('#866178957799325700').send("Welcome ${member.user.username} to the soft's lounge! Please read the rules and have fun!")
});

    //embed commands
        client.on("message", message => {
            //!embeded
        if (message.content.startsWith("!embeded")) {
         let args = message.content
         .split("")
         .slice(1)
           let firstArgs = message.content.replace("title:")
           let secondArgs = message.content.split("description:".replace("description:", ""))
         if(!args[0]) return message.channel.send("Hey if you want to make a embeded you need to inclue the corect format(!embeded <title> <description> <footer> <author> <color>)")
         const embededcmd = new Discord.MessageEmbed()
         .setTitle(message.content.splitText("title:"))
         .setColor(008080)
         .setAuthor("hohoho")
        .setDescription(secondArgs)
      .setFooter("")
        .setTimestamp()
        message.channel.send(embededcmd)
        }
        //!suggest
            if (message.content.startsWith("!suggest")) {
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
        })


    //random image finder
        client.on("message",async message => {
        //!meme
        if (message.content.startsWith("!meme")) {
            const subReddits = ["dankmeme", "meme", "me_irl"];
            const random = subReddits[Math.floor(Math.random() * subReddits.length)];

            const img = await randomPuppy(random);
         const meme = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setImage(img)
                .setTitle(`From /r/${random}`)
                .setURL('https://reddit.com/r/${random}');
            message.channel.send(meme);
            }
            })




client.login(token);
const Discord = require ('discord.js')
module.exports.config = {
    name: "botstats",
    aliases: [],
    category: "information",
    dmOnly: false, // Boolean
    guildOnly: false, // Boolean
    args: false, // Boolean
    usage: '',
    cooldown: 5, //seconds(s)
    guarded: false, // Boolean
    permissions: ["SEND_MESSAGES"],
}

module.exports.run = async (client, message, args) => {

let array = []

client.guilds.cache.forEach(async guild => {
    array.push(guild.memberCount)
})

let days = Math.floor(client.uptime / 86400000);
let hours = Math.floor(client.uptime / 3600000) % 24;
let minutes = Math.floor(client.uptime / 60000) % 60;
let seconds = Math.floor(client.uptime / 1000) % 60;

const embed = new Discord.MessageEmbed()
.setColor('#36393f')
.setAuthor(`${client.user.username} Bot Info`, client.user.displayAvatarURL({ dynamic: true, size: 512 }))
.setDescription(`**Bot Description**\n${client.user.tag} is a multi purpose discord bot with many different commands. I have fun commands, moderation commands, music commands and many more. Use the command \`>help\` to see my full list of commands.`)
.addFields(
    {name: 'Bot Username:', value: `\`\`\`${client.user.username}\`\`\``, inline: true},
    {name: 'Bot ID:', value: `\`\`\`${client.user.id}\`\`\``, inline: true},
    {name: 'Bot Servers', value: `\`\`\`${client.guilds.cache.size}\`\`\``, inline: true},
    {name: 'Bot UserCount', value: `\`\`\`${array.reduce((a, b) => a + b, 0)}\`\`\``, inline: true},
    {name: 'Bot Channel Count', value: `\`\`\`${client.channels.cache.size}\`\`\``, inline: true},
    {name: 'Bot Emoji Count', value: `\`\`\`${client.emojis.cache.size}\`\`\``, inline: true},
    {name: 'Bot Library', value: `\`\`\`Discord.JS\`\`\``, inline: true},
    {name: 'Bot Library Version', value: `\`\`\`${Discord.version}\`\`\``, inline: true},
    {name: 'Bot Status', value: `\`\`\`${client.user.presence.status}\`\`\``, inline: true},
    {name: 'Bot Uptime', value: `\`\`\`${days} Days, ${hours} Hours, ${minutes} Minutes, ${seconds} Seconds\`\`\``}
)

message.reply(embed)

}

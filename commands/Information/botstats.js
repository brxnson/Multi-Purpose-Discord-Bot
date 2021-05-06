const Discord = require ('discord.js')
module.exports.config = {
    name: "botstats",
    aliases: [],
    description: 'This will display information about the client user, such as uptime, server count etc',
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

let array = [] // Defining the array for all guild member counts

client.guilds.cache.forEach(async guild => { // Looping thought client guilds
    array.push(guild.memberCount) // Adding the guild membercount to the array 
})

let days = Math.floor(client.uptime / 86400000); // Defining days for the uptime
let hours = Math.floor(client.uptime / 3600000) % 24; // Defining hours for the uptime
let minutes = Math.floor(client.uptime / 60000) % 60; // Defining minutes for the uptime
let seconds = Math.floor(client.uptime / 1000) % 60; // Defining seconds for the uptime

const embed = new Discord.MessageEmbed()
.setColor('#36393f')
.setAuthor(`${client.user.username} Bot Info`, client.user.displayAvatarURL({ dynamic: true, size: 512 }))
.setDescription(`**Bot Description**\n${client.user.tag} is a multi purpose discord bot with many different commands. I have fun commands, moderation commands, music commands and many more. Use the command \`>help\` to see my full list of commands.`) // Setting the embed description as some bot description
.addFields( // Adding fields for information about the bot
    {name: 'Bot Username:', value: `\`\`\`${client.user.username}\`\`\``, inline: true}, // Adding a field showing the client username
    {name: 'Bot ID:', value: `\`\`\`${client.user.id}\`\`\``, inline: true}, // Adding a field showing the client id
    {name: 'Bot Servers', value: `\`\`\`${client.guilds.cache.size}\`\`\``, inline: true}, // Adding a field showing the client server count
    {name: 'Bot UserCount', value: `\`\`\`${array.reduce((a, b) => a + b, 0)}\`\`\``, inline: true}, // Adding a field showing the client usercount adding up the membercount array
    {name: 'Bot Channel Count', value: `\`\`\`${client.channels.cache.size}\`\`\``, inline: true}, // Adding a field showing the client channel count
    {name: 'Bot Emoji Count', value: `\`\`\`${client.emojis.cache.size}\`\`\``, inline: true}, // Adding a field showing the client emoji count\
    {name: 'Bot Library', value: `\`\`\`Discord.JS\`\`\``, inline: true}, // Adding a field showing the coding library
    {name: 'Bot Library Version', value: `\`\`\`${Discord.version}\`\`\``, inline: true}, // Adding a field showing the library version
    {name: 'Bot Status', value: `\`\`\`${client.user.presence.status}\`\`\``, inline: true}, // Adding a field to show the client presence status
    {name: 'Bot Uptime', value: `\`\`\`${days} Days, ${hours} Hours, ${minutes} Minutes, ${seconds} Seconds\`\`\``} // Adding a field to show the client uptime
)

message.reply(embed)

}

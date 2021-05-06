const Discord = require ('discord.js')
module.exports.config = {
    name: "emojis",
    aliases: [],
    description: 'This will send the message guilds emojis in an embed.\nIf there is too many emojis to display in an embed then it will display in a normal message',
    category: "information",
    dmOnly: false, // Boolean
    guildOnly: true, // Boolean
    args: false, // Boolean
    usage: '',
    cooldown: 5, //seconds(s)
    guarded: false, // Boolean
    permissions: ["SEND_MESSAGES"],
}

module.exports.run = async (client, message, args) => {

let arr = [] // Defining the array for the emojis

message.guild.emojis.cache.forEach(async emoji => { // Looping through each emoji in the guild
arr.push(emoji) // Adding the emoji to the array
})

const embed = new Discord.MessageEmbed()
.setAuthor(`${message.guild.name} Emojis!`, message.guild.iconURL())
.setColor('#36393f')
.setDescription(`**Emojis:**\n${arr.join(", ")}`) // Joining the array to send them in the embed

message.reply(embed).catch(err => {
     message.channel.send(`There was too many emojis to display in an embed!\n${arr.join(", ")}`).catch(err => {return message.channel.send('Sorry... There are too many emojis in this server to display them all!')})
})}
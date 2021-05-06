const Discord = require ('discord.js')
module.exports.config = {
    name: "channelid",
    aliases: [],
    description: 'This command will display the specified channels id in an embed',
    category: "information",
    dmOnly: false, // Boolean
    guildOnly: true, // Boolean
    args: true, // Boolean
    usage: '<Channel>',
    cooldown: 5, //seconds(s)
    guarded: false, // Boolean
    permissions: ["ADMINISTRATOR"],
}

module.exports.run = async (client, message, args) => {

let channel = message.mentions.channels.first() // Checking for a channel mention
if (!channel) channel = message.guild.channels.cache.find(c => c.id === args[0]) // Checking the guild cache for a channel id using the first argument
if (!channel) channel = client.channels.cache.get(args[0]) // Checking the client cache for a channel id using the argument
if (!channel) return message.channel.send('Please make sure you state a valid channel!') // If no channel was found it will return with this message

let embed = new Discord.MessageEmbed()
.setAuthor(`${channel.name} ID`, message.guild.iconURL())
.setColor('#36393f')
.setDescription(`**${channel.id}**`) // Setting the embed description as the channel id

message.channel.send(embed)

}
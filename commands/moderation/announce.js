const Discord = require ('discord.js')
module.exports.config = {
    name: "announce",
    aliases: [],
    description: 'This command will make an announcement to the specified channel, it will create a message collector asking for the text to send',
    category: "moderation",
    dmOnly: false, // Boolean
    guildOnly: true, // Boolean
    args: true, // Boolean
    usage: '<Channel>',
    cooldown: 5, //seconds(s)
    guarded: false, // Boolean
    permissions: ["ADMINISTRATOR"],
}

module.exports.run = async (client, message, args) => {

let channel = message.mentions.channels.first()
if (!channel) channel = client.channels.cache.get(args[0])
if (!channel) channel = message.guild.channels.cache.find(u => u.id === args[0])
if (!channel) channel = message.guild.channels.cache.find(u => u.name === args.join(" "))
if (!channel) return message.channel.send('Please make sure you mention a valid channel!') // If no channel was found in your argument it will return asking for a valid channel

let filter = m => m.author.id === message.author.id; // Making sure the message author for the collector is the command author
const embed = new Discord.MessageEmbed()
.setColor('#36393f')
.setTitle('Please respond with the text you would like in the announcement!')
message.reply(embed) // Sending the embed before creating the message collecter

const MessageCollector = message.channel.createMessageCollector(filter)

MessageCollector.on("collect", async collected => {

channel.send(collected.content).catch(err => { return message.channel.send(`An error has occured sending the message to ${channel}`)}) // If the bot cannot send the message to that channel it returns
message.channel.send(`Ok... Sent your announcement to ${channel}`) // If it has sent it then it replys with this

MessageCollector.stop() // Ends the collector
})

}
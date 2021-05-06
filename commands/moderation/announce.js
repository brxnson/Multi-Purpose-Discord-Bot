const Discord = require ('discord.js')
module.exports.config = {
    name: "announce",
    aliases: [],
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
if (!channel) return message.channel.send('Please make sure you mention a valid channel!')

let filter = m => m.author.id === message.author.id;
const embed = new Discord.MessageEmbed()
.setColor('#36393f')
.setTitle('Please respond with the text you would like in the announcement!')
message.reply(embed)

const MessageCollector = message.channel.createMessageCollector(filter)

MessageCollector.on("collect", async collected => {

channel.send(collected.content).catch(err => { return message.channel.send(`An error has occured sending the message to ${channel}`)})
message.channel.send(`Ok... Sent your announcement to ${channel}`)

MessageCollector.stop()
})

}
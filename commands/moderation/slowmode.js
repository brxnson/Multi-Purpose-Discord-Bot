const Discord = require ('discord.js')
module.exports.config = {
    name: "slowmode",
    aliases: [],
    category: "moderation",
    dmOnly: false, // Boolean
    guildOnly: true, // Boolean
    args: true, // Boolean
    usage: '<Slowmode>',
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

let filter = m => m.author.id === message.author.id
let Collector = message.channel.createMessageCollector(filter)

const embed = new Discord.MessageEmbed()
.setColor('#36393f')
.setDescription(`Please respond with the time to set the slowmode for ${channel}!`)
message.reply(embed)

Collector.on("collect", async collected => {

if (collected.content > 21600) {
    return message.channel.send('Please make sure your number is below 21600!')
}

try {

channel.setRateLimitPerUser(collected.content).catch(err => {return message.channel.send('An error has occured, please make sure i have permission to edit that channel and your argument is a valid number!')})
message.channel.send(`The slowmode for ${channel} has been set to ${collected.content}`)

} catch {
    return message.channel.send('An error has occured, please make sure i have permission to edit that channel and your argument is a valid number!')
}

Collector.stop()
})

}
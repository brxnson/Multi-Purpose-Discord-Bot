const Discord = require ('discord.js')
module.exports.config = {
    name: "slowmode",
    aliases: [],
    description: 'This will set the slowmode of the specified channel to the specified time',
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
if (!channel) return message.channel.send('Please make sure you mention a valid channel!') // If no valid channel was mentioned then it will return

let filter = m => m.author.id === message.author.id
let Collector = message.channel.createMessageCollector(filter) // Creating a message collector

const embed = new Discord.MessageEmbed()
.setColor('#36393f')
.setDescription(`Please respond with the time to set the slowmode for ${channel}!`)
message.reply(embed)

Collector.on("collect", async collected => { 

if (collected.content > 21600) {
    return message.channel.send('Please make sure your number is below 21600!') // If the collected time is over 21600 it returns as max time to set it at is 21600
}

try {

channel.setRateLimitPerUser(collected.content).catch(err => {return message.channel.send('An error has occured, please make sure i have permission to edit that channel and your argument is a valid number!')}) // Setting the slowmode, if it errors it will return
message.channel.send(`The slowmode for ${channel} has been set to ${collected.content}`)

} catch {
    return message.channel.send('An error has occured, please make sure i have permission to edit that channel and your argument is a valid number!')
}

Collector.stop() // Stopping the collector
})

}
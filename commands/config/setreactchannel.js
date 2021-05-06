const Discord = require ('discord.js')
const schema = require ('../../mongoose/React-Channel')
module.exports.config = {
    name: "setreactchannel",
    aliases: [],
    description: 'This will set the channel for the \`reactrole\` channel to fetch the message from. This will allow you to set the react role in that channel.',
    category: "config",
    dmOnly: false, // Boolean
    guildOnly: true, // Boolean
    args: true, // Boolean
    usage: '<Channel>',
    cooldown: 5, //seconds(s)
    guarded: false, // Boolean
    permissions: ["ADMINISTRATOR"],
}

module.exports.run = async (client, message, args) => {

let channel = message.mentions.channels.first() // Defining the channel as the first channel mention
if (!channel) channel = message.guild.channels.cache.find(c => c.id === args[0]) // Trying to get the channel from the specified id from the message guild
if (!channel) channel = client.channels.cache.get(args[0]) 
if (!channel) return message.channel.send('Please make sure you state a valid channel!') // If no channel was found it will return with this message

await schema.findOneAndUpdate({
    GuildID: message.guild.id
}, {
    GuildName: message.guild.name,
    GuildID: message.guild.id,
    ChannelID: channel.id
}, {
    upsert: true // If no current data it will create new data, if data for the guild is found then it will update that data
})

message.channel.send(`React channel has been set to ${channel}`)

}
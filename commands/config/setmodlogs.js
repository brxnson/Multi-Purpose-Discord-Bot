const Discord = require ('discord.js')
const schema = require ('../../mongoose/Modlogs')
module.exports.config = {
    name: "setmodlogs",
    aliases: [],
    description: 'This will allow you to set a channel for modlogs, this will send a message to that channel when something happens such as someone creating a channel, adding a bot, deleting a channel etc.',
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

let channel = message.mentions.channels.first() // Finding a channel from the first channel mention
if (!channel) channel = client.channels.cache.get(args[0]) // Trying to find a channel from the client cache of the specified id 
if (!channel) channel = message.guild.channels.cache.find(u => u.id === args[0]) // Trying to find a channel from the message guild using the first argument id
if (!channel) channel = message.guild.channels.cache.find(u => u.name === args.join(" ")) // Trying to find a channel from the message guild using the first argument name
if (!channel) return message.channel.send('Please make sure you mention a valid channel!') // If no channel was found then it will return with this message

let data = await schema.findOne({
    GuildID: message.guild.id
})

if (data) {
await schema.findOneAndDelete({ // If data was found then it will delete the data to disable the modlogs
    GuildID: message.guild.id
})

message.channel.send('Modlogs have been disabled in this guild!\nTo enable them use the command \`>setmodlogs <channel>\`')
} else if (!data) {

let newData = new schema({ // If no data was found then this is defining the new data to be saved
    GuildName: message.guild.name,
    GuildID: message.guild.id,
    ChannelID: channel.id
})
newData.save() // Saving the new data
message.channel.send(`${channel} has been set as the modlogs channel!`)

}}
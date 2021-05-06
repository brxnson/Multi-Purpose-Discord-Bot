const Discord = require ('discord.js')
const schema = require ('../../mongoose/Delete-Logs')
module.exports.config = {
    name: "setdelete",
    aliases: [],
    description: 'This will allow you to set a channel to send a message to when a message is deleted in the guild. This will tell you what the message content was and who the author was.',
    category: "config",
    dmOnly: false, // Boolean
    guildOnly: true, // Boolean
    args: true, // Boolean
    usage: '<channel>',
    cooldown: 5, //seconds(s)
    guarded: false, // Boolean
    permissions: ["ADMINISTRATOR"],
}

module.exports.run = async (client, message, args) => {

let channel = message.mentions.channels.first() // Defining channel as a channel mention
if (!channel) message.guild.channels.cache.find(u => u.id === args[0])
if (!channel) return message.channel.send('Please make sure you state a valid channel!') // If a channel was not found then it will return telling you to state a valid channel

const data = await schema.findOne({ 
    GuildID: message.guild.id
})

if (data) {

await schema.findOneAndDelete({ // If current data was found then it will delete the current data to disable the message delete logs
    GuildID: message.guild.id
})

message.channel.send('Delete Messages logs have been disabled for this server!\nTo set them again use the command \`>setdelete <channel>\`')

} else if (!data) {

let newData = new schema({ // If no data was found then this is defining the new data that will be made
    GuildName: message.guild.name,
    GuildID: message.guild.id,
    ChannelID: channel.id
})

newData.save() // Saving the new data that has been made
message.channel.send(`${channel} has been set as the message delete logs channel!`)

}}

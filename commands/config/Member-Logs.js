const Discord = require ('discord.js')
const schema = require ('../../mongoose/Join-Logs') // Defining the schema for the memberlogs command
module.exports.config = {
    name: "memberlogs",
    aliases: [],
    description: 'This command will allow you to set a channel for member logs, this will send a message to the specified channel everytime a user joins or leaves the guild',
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

let channel = message.mentions.channels.first() // Defining channel as the first channel mention
if (!channel) channel = message.guild.channels.cache.find(c => c.id === args[0]) // If a channel mention was not found it will try and find a channel from your first argument id
if (!channel) channel = client.channels.cache.get(args[0]) 
if (!channel) return message.channel.send('Please make sure you state a valid channel!') // If a channel was not found then it will return and send this message

const data = await schema.findOne({ // Trying to find the message guild id in the mongoDB database
    GuildID: message.guild.id
})

if (data) {

await schema.findOneAndDelete({ // If the guild id was found it will delete the found data 
    GuildID: message.guild.id
})

message.channel.send('Join logs has been disabled, to re enable them run the command \`>joinlogs\` and state a channel!')

} else if (!data) {

let newData = new schema({ // If no data was found this is defining the new data with the channel you specified
    GuildName: message.guild.name,
    GuildID: message.guild.id,
    ChannelID: channel.id
})

newData.save() // Saving the data
message.channel.send(`The join logs channel has been set to ${channel}`)

}

}

const Discord = require ('discord.js')
const schema = require ('../../mongoose/Join-Logs')
module.exports.config = {
    name: "memberlogs",
    aliases: [],
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

let channel = message.mentions.channels.first()
if (!channel) channel = message.guild.channels.cache.find(c => c.id === args[0])
if (!channel) channel = client.channels.cache.get(args[0])
if (!channel) return message.channel.send('Please make sure you state a valid channel!')

const data = await schema.findOne({
    GuildID: message.guild.id
})

if (data) {

await schema.findOneAndDelete({
    GuildID: message.guild.id
})

message.channel.send('Join logs has been disabled, to re enable them run the command \`>joinlogs\` and state a channel!')

} else if (!data) {

let newData = new schema({
    GuildName: message.guild.name,
    GuildID: message.guild.id,
    ChannelID: channel.id
})

newData.save()
message.channel.send(`The join logs channel has been set to ${channel}`)

}

}

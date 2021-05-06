const Discord = require ('discord.js')
const schema = require ('../../mongoose/Modlogs')
module.exports.config = {
    name: "setmodlogs",
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
if (!channel) channel = client.channels.cache.get(args[0])
if (!channel) channel = message.guild.channels.cache.find(u => u.id === args[0])
if (!channel) channel = message.guild.channels.cache.find(u => u.name === args.join(" "))
if (!channel) return message.channel.send('Please make sure you mention a valid channel!')

let data = await schema.findOne({
    GuildID: message.guild.id
})

if (data) {
await schema.findOneAndDelete({
    GuildID: message.guild.id
})

message.channel.send('Modlogs have been disabled in this guild!\nTo enable them use the command \`>setmodlogs <channel>\`')
} else if (!data) {

let newData = new schema({
    GuildName: message.guild.name,
    GuildID: message.guild.id,
    ChannelID: channel.id
})
newData.save()
message.channel.send(`${channel} has been set as the modlogs channel!`)

}}
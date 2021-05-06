const Discord = require ('discord.js')
const schema = require ('../../mongoose/React-Channel')
module.exports.config = {
    name: "setreactchannel",
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

await schema.findOneAndUpdate({
    GuildID: message.guild.id
}, {
    GuildName: message.guild.name,
    GuildID: message.guild.id,
    ChannelID: channel.id
}, {
    upsert: true
})

message.channel.send(`React channel has been set to ${channel}`)

}
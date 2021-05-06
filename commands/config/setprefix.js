const Discord = require ('discord.js')
module.exports.config = {
    name: "setprefix",
    aliases: [],
    category: "config",
    dmOnly: false, // Boolean
    guildOnly: true, // Boolean
    args: true, // Boolean
    usage: '<prefix>',
    cooldown: 10, //seconds(s)
    guarded: false, // Boolean
    permissions: ["ADMINISTRATOR"],
}

module.exports.run = async (client, message, args) => {

const schema = require ('../../mongoose/prefix')

await schema.findOneAndUpdate({
    GuildID: message.guild.id
}, {
    GuildName: message.guild.name,
    GuildID: message.guild.id,
    Prefix: args[0]
}, {
    upsert: true
})

message.channel.send(`The prefix has been set to \`${args[0]}\``)

}

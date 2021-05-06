const Discord = require ('discord.js')
module.exports.config = {
    name: "unvmute",
    aliases: [],
    category: "moderation",
    dmOnly: false, // Boolean
    guildOnly: true, // Boolean
    args: true, // Boolean
    usage: '<user>',
    cooldown: 5, //seconds(s)
    guarded: false, // Boolean
    permissions: ["MOVE_MEMBERS"],
}

module.exports.run = async (client, message, args) => {

let member = message.mentions.members.first()
if (!member) member = message.guild.members.cache.find(u => u.id === args[0])
if (!member) return message.channel.send('Please make sure you state a valid user to server mute!')
if (!member.voice.channel) return message.channel.send(`${member} is not in a voice channel!`)
    
if (member.permissions.has("ADMINISTRATOR")) {
    return message.channel.send('You cannot server mute a server administrator!')
} else if (member.roles.highest.position > message.member.roles.highest.position) {
    return message.channel.send('You cannot use this command on someone with more power than you!')
} else if (member.id === message.author.id) {
    return message.channel.send('Silly... You cannot mute yourself!')
}
    
member.voice.setMute(false)
message.channel.send(`${member} has been unserver muted!`)

}

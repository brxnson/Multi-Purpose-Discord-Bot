const Discord = require ('discord.js')
module.exports.config = {
    name: "vmute",
    aliases: [],
    description: 'This will server mute the mentioned user',
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
if (!member) return message.channel.send('Please make sure you state a valid user to server mute!') // If no valid user was specified it will return
if (!member.voice.channel) return message.channel.send(`${member} is not in a voice channel!`) // If the specified user is not in a voice channel it will return

if (member.permissions.has("ADMINISTRATOR")) {
    return message.channel.send('You cannot server mute a server administrator!') // If the specified user it will return
} else if (member.roles.highest.position > message.member.roles.highest.position) {
    return message.channel.send('You cannot use this command on someone with more power than you!') // If the specified user has a higher role than the message author it will return
} else if (member.id === message.author.id) {
    return message.channel.send('Silly... You cannot mute yourself!') // If you try mute yourself it will return
}
 
member.voice.setMute(true) // Server Muting the mentioned user
message.channel.send(`${member} has been server muted!`)

}

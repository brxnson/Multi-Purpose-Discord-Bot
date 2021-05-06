const Discord = require ('discord.js')
module.exports.config = {
    name: "unvmute",
    aliases: [],
    description: 'This will un server mute the specified user',
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
if (!member) return message.channel.send('Please make sure you state a valid user to server mute!') // If to valid member was specified it will return
if (!member.voice.channel) return message.channel.send(`${member} is not in a voice channel!`) // If the specified user is not in a voice channel it will return
    
member.voice.setMute(false) // Setting the member server mute as false
message.channel.send(`${member} has been unserver muted!`) // Replying with this message

}

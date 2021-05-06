const Discord = require ('discord.js')
module.exports.config = {
    name: "kick",
    aliases: [],
    category: "moderation",
    dmOnly: false, // Boolean
    guildOnly: true, // Boolean
    args: true, // Boolean
    usage: '<User>',
    cooldown: 5, //seconds(s)
    guarded: false, // Boolean
    permissions: ["ADMINISTRATOR"],
}

module.exports.run = async (client, message, args) => {

let user = message.mentions.members.first()
if (!user) user = message.guild.members.cache.find(u => u.id === args[0])
if (!user) return message.channel.send('Please make sure you state a valid user to kick!')

if (user.permissions.has("ADMINISTRATOR")) {
    return message.channel.send('I am unable to kick that user, they have administrator permissions!')
} else if (user.roles.highest.position > message.member.roles.highest.position) {
    return message.channel.send('I am unable to kcik that user, they have a higher role than you!')
} else if (user.roles.highest.position > message.guild.me.roles.highest.position) {
    return message.channel.send('I am unable to kick that user, they have a higher role than me!')
} else if (!message.guild.me.permissions.has("KICK_MEMBERS")) {
    return message.channel.send('I am unable to kick that user, please make sure i have the \`Kick Members\` position!')
}

await user.kick()
message.channel.send(`${user} has been kicked!`)
}
const Discord = require ('discord.js')
module.exports.config = {
    name: "kick",
    aliases: [],
    description: 'This command will allow you to kick the specified member',
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
if (!user) return message.channel.send('Please make sure you state a valid user to kick!') // If no valid user was specified it will return

if (user.permissions.has("ADMINISTRATOR")) { 
    return message.channel.send('I am unable to kick that user, they have administrator permissions!') // If the user has the administrator permissions it returns
} else if (user.roles.highest.position > message.member.roles.highest.position) {
    return message.channel.send('I am unable to kick that user, they have a higher role than you!') // If the user has a higher role and you then it returns
} else if (user.roles.highest.position > message.guild.me.roles.highest.position) {
    return message.channel.send('I am unable to kick that user, they have a higher role than me!') // If the user has a higher role than the client it returns
} else if (!message.guild.me.permissions.has("KICK_MEMBERS")) {
    return message.channel.send('I am unable to kick that user, please make sure i have the \`Kick Members\` position!') // If the client does not have the kick members permission it returns
}

await user.kick() // Else it kicks the users
message.channel.send(`${user} has been kicked!`) // Replys saying user has been kicked
}
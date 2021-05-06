const Discord = require ('discord.js')
module.exports.config = {
    name: "ban",
    aliases: [],
    description: 'This command will ban the specified user from your server',
    category: "moderation",
    dmOnly: false, // Boolean
    guildOnly: true, // Boolean
    args: true, // Boolean
    usage: '<user>',
    cooldown: 5, //seconds(s)
    guarded: false, // Boolean
    permissions: ["ADMINISTRATOR"],
}

module.exports.run = async (client, message, args) => {

let user = message.mentions.members.first()
if (!user) user = message.guild.members.cache.find(u => u.id === args[0])
if (!user) return message.channel.send('Please make sure you state a valid user to ban!') // If no member was found it returns this message

if (!user.bannable) { 
    return message.channel.send('That user cannot be banned!') // If the user isnt bannable then it returns this message
} else if (!message.guild.me.permissions.has("BAN_MEMBERS")) {
    return message.channel.send(`I am unable to ban that user, please make sure i have the \`Ban Members\` Permission!`) // If the bot doesn't have the ban members permissions it returns this message
}

await user.ban() // Bans the user otherwise
message.channel.send(`${user} has been banned!`) // Replys with this message

}
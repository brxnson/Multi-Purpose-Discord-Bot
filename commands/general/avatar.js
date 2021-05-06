const Discord = require ('discord.js')
module.exports.config = {
    name: "avatar",
    aliases: ["av"],
    description: 'This will display avatar for the specified mentioned user, it will also send the links of their avatar in a JPG and PNG format',
    category: "general",
    dmOnly: false, // Boolean
    guildOnly: true, // Boolean
    args: true, // Boolean
    usage: '<user>',
    cooldown: 5, //seconds(s)
    guarded: false, // Boolean
    permissions: ["SEND_MESSAGES"],
}

module.exports.run = async (client, message, args) => {

let user = message.mentions.users.first() // Defining user as the first user mention
if (!user) return message.channel.send('Please make sure you state a valid user!') // If no user was found then it returns with this message

let avatarembed = new Discord.MessageEmbed()
.setTitle(`${user.tag} Avatar`)
.setColor('#36393f')
.setDescription(`
    Link as:
    - [png](${user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 })})
    - [jpg](${user.displayAvatarURL({ format: 'jpg', dynamic: true, size: 1024 })})
    `)
    
.setImage(user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 })) // Setting the embed image as the avatar
.setFooter(`Requested By: ${message.author.tag}`, `${message.author.displayAvatarURL()}`)
.setTimestamp()
    
return message.channel.send(avatarembed).catch(err => message.channel.send(':warning: - I do not have the correct permissions required for this command, please grant me the \`Embed Links\` permission!'))
    

}

const Discord = require ('discord.js')
module.exports.config = {
    name: "avatar",
    aliases: ["av"],
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

let user = message.mentions.users.first()
if (!user) return message.channel.send('Please make sure you state a valid user!')

let avatarembed = new Discord.MessageEmbed()
.setTitle(`${user.tag} Avatar`)
.setColor('#36393f')
.setDescription(`
    Link as:
    - [png](${user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 })})
    - [jpg](${user.displayAvatarURL({ format: 'jpg', dynamic: true, size: 1024 })})
    `)
    
.setImage(user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
.setFooter(`Requested By: ${message.author.tag}`, `${message.author.displayAvatarURL()}`)
.setTimestamp()
    
return message.channel.send(avatarembed).catch(err => message.channel.send(':warning: - I do not have the correct permissions required for this command, please grant me the \`Embed Links\` permission!'))
    

}

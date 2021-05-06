// Message Delete event to send the deleted messages to our log channel

const Discord = require ('discord.js')
const schema = require ('../mongoose/Delete-Logs')
module.exports = async (client) => {

client.on("messageDelete", async message => { // Event for the message delete logs

const data = await schema.findOne({
    GuildID: message.guild.id
})

if (data) {

const channel = message.guild.channels.cache.find(channel => channel.id === data.ChannelID)

if (message.attachments.size > 0) {

    const embed = new Discord.MessageEmbed()
    .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true, size: 512 }))
    .setColor('RED')
    .setFooter(`User ID: ${message.author.id} | Message ID: ${message.id}`)
    .setTimestamp()
    .setDescription(`**Message Sent by <@${message.author.id}> has been deleted from <#${message.channel.id}>**`)
        
    channel.send(embed)
    
    } else {
     
    const embed = new Discord.MessageEmbed()
    .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true, size: 512 }))
    .setColor('RED')
    .setFooter(`User ID: ${message.author.id} | Message ID: ${message.id}`)
    .setTimestamp()
    .setDescription(`**Message Sent by <@${message.author.id}> has been deleted from <#${message.channel.id}>**\n${message.content}`)
    
    
    channel.send(embed).catch(err => {
    
    const embed = new Discord.MessageEmbed()
    .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true, size: 512 }))
    .setColor('RED')
    .setFooter(`User ID: ${message.author.id} | Message ID: ${message.id}`)
    .setTimestamp()
    .setDescription(`**Message Sent by <@${message.author.id}> has been deleted from <#${message.channel.id}>**`)
    
    })
    
    }

}

})

}
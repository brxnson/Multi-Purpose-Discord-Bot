const Discord = require ('discord.js')
const Logs = require ('../mongoose/Join-Logs')
module.exports = async (client) => {

client.on("guildMemberRemove", async member => { // Event for the member logs for when a member leaves
    
const data = await Logs.findOne({
    GuildID: member.guild.id
})

if (data) {

const channel = client.channels.cache.get(data.ChannelID)
const embed = new Discord.MessageEmbed()
.setAuthor(`Member Left`, member.user.displayAvatarURL({ dynamic: true, size: 512 }))
.setColor('#36393f')
.setDescription(`<@${member.user.id}> ${member.user.tag}`)
.setFooter(`User ID: ${member.user.id}`)
.setTimestamp()

channel.send(embed)

}

})

}
const Discord = require ('discord.js')
const moment = require ('moment')
const AutoRole = require ('../mongoose/AutoRole')
const JoinLogs = require ('../mongoose/Join-Logs')
module.exports = async (client) => {

client.on("guildMemberAdd", async member => { // event for the member logs for joined members

const  Auto = await AutoRole.findOne({
    GuildID: member.guild.id
})
const Joins = await JoinLogs.findOne({
    GuildID: member.guild.id
})

if (Auto && !Joins) {

const role = member.guild.roles.cache.find(r => r.id === Auto.RoleID)
member.roles.add(role)

} else if (Joins && !Auto) {

const channel = client.channels.cache.get(Joins.ChannelID) // getting the channel to send the message to

const embed = new Discord.MessageEmbed()
.setAuthor(`Member Joined`, member.user.displayAvatarURL({ dynamic: true, size: 512 }))
.setColor('#36393f')
.setDescription(`<@${member.user.id}> ${member.user.tag}`)
.setTimestamp()
.setFooter(`User ID: ${member.user.id}`)
.addFields(
    {name: 'Account Age', value: `${moment(member.user.createdTimestamp).format("DD MMM YYYY")}`}
)

channel.send(embed)

} else if (Joins && Auto) {

const role = member.guild.roles.cache.find(r => r.id === Auto.RoleID) // if auto role is enabled it adds the role
member.roles.add(role)

const channel = client.channels.cache.get(Joins.ChannelID)

const embed = new Discord.MessageEmbed()
.setAuthor(`Member Joined`, member.user.displayAvatarURL({ dynamic: true, size: 512 }))
.setColor('#36393f')
.setDescription(`<@${member.user.id}> ${member.user.tag}`)
.setTimestamp()
.setFooter(`User ID: ${member.user.id}`)
.addFields(
    {name: 'Account Age', value: `${moment(member.user.createdTimestamp).format("DD MMM YYYY")}`}
)
    
channel.send(embed)
channel.send(`${role} has been added to <@${member.user.id}> due to the auto role!`)

}

})

}
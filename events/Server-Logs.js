const schema = require ('../mongoose/Modlogs')
const Discord = require ('discord.js')
module.exports = async (client) => {

client.on('channelCreate', async (channel) => {

if (channel.type === 'dm') return

const guild = client.guilds.cache.get(channel.guild.id)
const fetchedLogs = await guild.fetchAuditLogs({
    limit: 1,
    type: "CHANNEL_CREATE"
});

const Log = fetchedLogs.entries.first();
const { executor } = Log

const data = await schema.findOne({
    GuildID: guild.id
})
if (data) {

const LogChannel = client.channels.cache.get(data.ChannelID)

const embed = new Discord.MessageEmbed()
.setFooter(`Executor ID: ${executor.id} | Channel ID: ${channel.id}`)
.setColor('#36393f')
.addFields(
    {name: `Executor`, value: `<@${executor.id}>`, inline: true},
    {name: 'Channel Made', value: `Name: ${channel.name} (<#${channel.id}>)`}
)

LogChannel.send(embed)
}});

client.on('channelDelete', async (channel) => {

const guild = client.guilds.cache.get(channel.guild.id)
const fetchedLogs = await guild.fetchAuditLogs({
    limit: 1,
    type: "CHANNEL_DELETE"
});
    
const Log = fetchedLogs.entries.first();
const { executor } = Log
    
const data = await schema.findOne({
    GuildID: guild.id
})
if (data) {
    
const LogChannel = client.channels.cache.get(data.ChannelID)
    
const embed = new Discord.MessageEmbed()
.setFooter(`Executor ID: ${executor.id} | Channel ID: ${channel.id}`)
.setColor('#36393f')
.addFields(
    {name: `Executor`, value: `<@${executor.id}>`, inline: true},
    {name: 'Channel Deleted', value: `Name: ${channel.name} (<#${channel.id}>)`}
)
    
LogChannel.send(embed)
}});

client.on("guildMemberAdd", async member => {


const guild = client.guilds.cache.get(member.guild.id)
const fetchedLogs = await guild.fetchAuditLogs({
    limit: 1,
    type: "BOT_ADD"
})

const Log = fetchedLogs.entries.first()
const { executor, target } = Log

const data = await schema.findOne({
    GuildID: guild.id
})

if (data) {
const channel = client.channels.cache.get(data.ChannelID)
if (member.user.bot) {

const embed = new Discord.MessageEmbed()
.setFooter(`Executor ID: ${executor.id} | Bot ID: ${target.id}`)
.setColor('#36393f')
.addFields(
    {name: `Executor`, value: `<@${executor.id}>`, inline: true},
    {name: 'Bot Added', value: `Name: ${target.tag} (<@${target.id}>)`}
)
    
channel.send(embed)
}}})

client.on("guildBanAdd", async (guild) => {

const fetchedLogs = await guild.fetchAuditLogs({
    limit: 1,
    type: "MEMBER_BAN_ADD"
});
const Log = fetchedLogs.entries.first()
const { executor, target } = Log 

const data = await schema.findOne({
    GuildID: guild.id
})
if (data) {
const channel = client.channels.cache.get(data.ChannelID)

const embed = new Discord.MessageEmbed()
.setFooter(`Executor ID: ${executor.id} | Target ID: ${target.id}`)
.setColor('#36393f')
.addFields(
    {name: `Executor`, value: `<@${executor.id}>`, inline: true},
    {name: 'Member Banned', value: `Name: ${target.tag} (<@${target.id}>)`}
)
channel.send(embed)
}})

client.on("guildBanRemove", async (guild) => {

const fetchedLogs = await guild.fetchAuditLogs({
    limit: 1,
    type: "MEMBER_BAN_REMOVE"
});
const Log = fetchedLogs.entries.first()
const { executor, target } = Log 
    
const data = await schema.findOne({
    GuildID: guild.id
})
if (data) {
const channel = client.channels.cache.get(data.ChannelID)
    
const embed = new Discord.MessageEmbed()
.setFooter(`Executor ID: ${executor.id} | Target ID: ${target.id}`)
.setColor('#36393f')
.addFields(
    {name: `Executor`, value: `<@${executor.id}>`, inline: true},
    {name: 'Member Unbanned', value: `Name: ${target.tag} (<@${target.id}>)`}
)
channel.send(embed)
}})

client.on("roleCreate", async (role) => {

const guild = client.guilds.cache.get(role.guild.id)

const fetchedLogs = await guild.fetchAuditLogs({
    limit: 1,
    type: "ROLE_CREATE"
})
const Log = fetchedLogs.entries.first()
const { executor } = Log

const data = await schema.findOne({
    GuildID: guild.id
})
if (data) {

const channel = client.channels.cache.get(data.ChannelID)

const embed = new Discord.MessageEmbed()
.setFooter(`Executor ID: ${executor.id} | Role ID: ${role.id}`)
.setColor('#36393f')
.addFields(
    {name: `Executor`, value: `<@${executor.id}>`, inline: true},
    {name: 'Role Created', value: `Name: ${role.name} (<@&${role.id}>)`}
)
channel.send(embed)
}})

client.on("roleDelete", async (role) => {

const guild = client.guilds.cache.get(role.guild.id)
    
const fetchedLogs = await guild.fetchAuditLogs({
    limit: 1,
    type: "ROLE_DELETE"
})
const Log = fetchedLogs.entries.first()
const { executor } = Log
    
const data = await schema.findOne({
    GuildID: guild.id
})
if (data) {
    
const channel = client.channels.cache.get(data.ChannelID)
    
const embed = new Discord.MessageEmbed()
.setFooter(`Executor ID: ${executor.id} | Role ID: ${role.id}`)
.setColor('#36393f')
.addFields(
    {name: `Executor`, value: `<@${executor.id}>`, inline: true},
    {name: 'Role Delete', value: `Name: ${role.name} (<@&${role.id}>)`}
)
channel.send(embed)
}})


}
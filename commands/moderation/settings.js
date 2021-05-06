const Discord = require ('discord.js')
const AutoRole = require ('../../mongoose/AutoRole')
const DeleteLogs = require ('../../mongoose/Delete-Logs')
const MemberLogs = require ('../../mongoose/Join-Logs')
const Prefix = require ('../../mongoose/prefix')
const ModLogs = require ('../../mongoose/Modlogs')
module.exports.config = {
    name: "settings",
    aliases: [],
    description: 'This will send the current server settings that are saved in the database.',
    category: "moderation",
    dmOnly: false, // Boolean
    guildOnly: true, // Boolean
    args: false, // Boolean
    usage: '',
    cooldown: 5, //seconds(s)
    guarded: false, // Boolean
    permissions: ["ADMINISTRATOR"],
}

module.exports.run = async (client, message, args) => {

const data = await AutoRole.findOne({
    GuildID: message.guild.id
})
const data2 = await DeleteLogs.findOne({
    GuildID: message.guild.id
})
const data3 = await MemberLogs.findOne({
    GuildID: message.guild.id
})
const data4 = await Prefix.findOne({
    GuildID: message.guild.id
})
const data5 = await ModLogs.findOne({
    GuildID: message.guild.id
})

let arr = []

if (!data) {
    arr.push('Not Set')
} else {
    arr.push(`<@&${data.RoleID}>`)
}
if (!data2) {
    arr.push('Not Set')
} else {
    arr.push(`<#${data2.ChannelID}>`)
}
if (!data3) {
    arr.push(`Not Set`)
} else {
    arr.push(`<#${data3.ChannelID}>`)
}
if (!data4) {
    arr.push(`Prefix is \`>\``)
} else {
    arr.push (`Prefix is \`${data4.Prefix}\``)
}
if (!data5) {
    arr.push(`Not Set`)
} else {
    arr.push(`<#${data5.ChannelID}>`)
}

const embed = new Discord.MessageEmbed()
.setAuthor(`${message.guild.name} Config Settings`, message.guild.iconURL())
.setColor('#36393f')
.addFields(
    {name: 'Current Prefix', value: `${arr[3]}`, inline: true},
    {name: 'Member Logs Channel', value: `${arr[2]}`, inline: true},
    {name: 'Auto Role', value: `${arr[0]}`, inline: true},
    {name: 'ModLogs Channel', value: `${arr[4]}`, inline: true},
    {name: 'Delete Logs Channel', value: `${arr[1]}`, inline: true}
)

message.reply(embed)

}
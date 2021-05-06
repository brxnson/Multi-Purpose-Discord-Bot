const Discord = require ('discord.js')
module.exports.config = {
    name: "listadmins",
    aliases: [],
    category: "misc",
    dmOnly: false, // Boolean
    guildOnly: true, // Boolean
    args: false, // Boolean
    usage: '',
    cooldown: 5, //seconds(s)
    guarded: false, // Boolean
    permissions: ["SEND_MESSAGES"],
}

module.exports.run = async (client, message, args) => {

let arr = []

message.guild.members.cache.forEach(async member => {

if (member.permissions.has("ADMINISTRATOR")) {
    arr.push(`<@${member.id}>`)
}})

const embed = new Discord.MessageEmbed()
.setAuthor(`${message.guild.name} Administrators! [${arr.length}]`, message.guild.iconURL())
.setColor('#36393f')
.setDescription(arr.join("\n"))

message.channel.send(embed)

}
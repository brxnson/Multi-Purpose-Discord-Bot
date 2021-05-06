const Discord = require ('discord.js')
module.exports.config = {
    name: "membercount",
    aliases: [],
    description: 'This will send an embed with the message guild membercount',
    category: "general",
    dmOnly: false, // Boolean
    guildOnly: true, // Boolean
    args: false, // Boolean
    usage: '<> <>',
    cooldown: 5, //seconds(s)
    guarded: false, // Boolean
    permissions: ["SEND_MESSAGES"],
}

module.exports.run = async (client, message, args) => {

const embed = new Discord.MessageEmbed()
.setAuthor(`${message.guild.name} MemberCount`, message.guild.iconURL()) // Setting the embed author as the guild name and the guild icon
.setColor('#36393f')
.setFooter(`Invoked by ${message.author.tag}`)
.setTimestamp()

.setDescription(`${message.guild.memberCount} Members`) // Setting the embed description as the membercount

message.reply(embed)

}

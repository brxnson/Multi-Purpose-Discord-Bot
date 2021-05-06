const Discord = require ('discord.js')
module.exports.config = {
    name: "membercount",
    aliases: [],
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
.setTitle(`${message.guild.name} MemberCount`)
.setColor('#36393f')
.setFooter(`Invoked by ${message.author.tag}`)
.setTimestamp()

.setDescription(`${message.guild.memberCount} Members`)

message.reply(embed)

}

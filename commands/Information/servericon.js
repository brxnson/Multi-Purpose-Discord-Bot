const Discord = require ('discord.js')
module.exports.config = {
    name: "servericon",
    aliases: [],
    category: "information",
    dmOnly: false, // Boolean
    guildOnly: true, // Boolean
    args: false, // Boolean
    usage: '',
    cooldown: 5, //seconds(s)
    guarded: false, // Boolean
    permissions: ["SEND_MESAGES"],
}

module.exports.run = async (client, message, args) => {

const embed = new Discord.MessageEmbed()
.setTitle(`${message.guild.name} Server Icon`)
.setColor('#36393f')
.setImage(message.guild.iconURL())

message.channel.send(embed)
}
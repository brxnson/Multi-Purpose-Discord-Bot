const Discord = require ('discord.js')
module.exports.config = {
    name: "servericon",
    aliases: [],
    description: 'This will send the server icon in an embed image',
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
.setTitle(`${message.guild.name} Server Icon`, message.guild.iconURL())
.setColor('#36393f')
.setImage(message.guild.iconURL()) // Setting the embed image as the message guild icon

message.channel.send(embed)
}
const Discord = require ('discord.js')
module.exports.config = {
    name: "commandsize",
    aliases: [],
    description: 'This command will send an embed telling you how many command there are',
    category: "misc",
    dmOnly: false, // Boolean
    guildOnly: false, // Boolean
    args: false, // Boolean
    usage: '',
    cooldown: 5, //seconds(s)
    guarded: false, // Boolean
    permissions: ["SEND_MESSAGES"],
}

module.exports.run = async (client, message, args) => {

const embed = new Discord.MessageEmbed()
.setTitle('Bot Command Size')
.setColor('#36393f')
.setDescription(`There are `+client.commands.size+' commands!') // Setting the embed description as the client.commands.size for the command size

message.reply(embed)

}
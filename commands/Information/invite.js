const Discord = require ('discord.js')
module.exports.config = {
    name: "invite",
    aliases: [],
    category: "information",
    dmOnly: false, // Boolean
    guildOnly: false, // Boolean
    args: false, // Boolean
    usage: '<> <>',
    cooldown: 5, //seconds(s)
    guarded: false, // Boolean
    permissions: [],
}

module.exports.run = async (client, message, args) => {

    const embed = new Discord.MessageEmbed()

.setColor('#36393f')
.setDescription(`[Click here to invite me to your server](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot)`)
    
message.reply(embed).catch(err => message.channel.send(':warning: - I do not have the correct permissions required for this command, please grant me the \`Embed Links\` permission!'))

}

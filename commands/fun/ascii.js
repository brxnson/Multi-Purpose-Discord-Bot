const Discord = require ('discord.js')
const figlet = require ("figlet")
module.exports.config = {
    name: "ascii",
    aliases: [],
    category: "fun",
    dmOnly: false, // Boolean
    guildOnly: false, // Boolean
    args: true, // Boolean
    usage: '<text>',
    cooldown: 5, //seconds(s)
    guarded: false, // Boolean
    permissions: ["SEND_MESSAGES"],
}

module.exports.run = async (client, message, args) => {

figlet.text(args.join(" "), (err, text) => {

if (err) {
    return message.channel.send(err)
}

const embed = new Discord.MessageEmbed()
.setTitle(`Your Text Asciified`)
.setColor('#36393f')
.setDescription(`\`\`\`${text.trimRight()}\`\`\``)

message.channel.send(embed)

})}
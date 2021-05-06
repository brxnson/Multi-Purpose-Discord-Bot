const Discord = require ('discord.js')
const figlet = require ("figlet")
module.exports.config = {
    name: "ascii",
    aliases: [],
    description: 'Turns your specfied text into ascii text in an embed',
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

figlet.text(args.join(" "), (err, text) => { // Translating the text into ascii text

if (err) {
    return message.channel.send(err) // If an error happened it returns with the error
}

const embed = new Discord.MessageEmbed()
.setTitle(`Your Text Asciified`)
.setColor('#36393f')
.setDescription(`\`\`\`${text.trimRight()}\`\`\``) // Adding the asciified text to the embed

message.channel.send(embed)

})}
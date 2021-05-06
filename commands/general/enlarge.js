const Discord = require ('discord.js')
const { parse } = require('twemoji-parser')
module.exports.config = {
    name: "enlarge",
    aliases: [],
    description: 'This will enlarge the specified emoji and send the enlarged version inside of the embed',
    category: "general",
    dmOnly: false, // Boolean
    guildOnly: false, // Boolean
    args: true, // Boolean
    usage: '<emoji>',
    cooldown: 5, //seconds(s)
    guarded: false, // Boolean
    permissions: ["SEND_MESSAGES"],
}

module.exports.run = async (client, message, args) => {

if (!args[0]) return message.channel.send('Please make sure you state an emoji to enlarge!')    
let emoji = Discord.Util.parseEmoji(args[0]); // Defining the emojioe as the parsed emoji

const embed = new Discord.MessageEmbed()
.setTitle(`Enlarged version of your emoji!`)
.setColor('#36393f')
.setFooter(`Requested By ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))

if (emoji.id) { // If the emoji is custom then it runs this
    embed.setImage(`https://cdn.discordapp.com/emojis/${emoji.id}.${emoji.animated ? "gif" : "png"}`) // Sets the embed image as the picture
    message.channel.send(embed)
} else if (!emoji.id) { // If the emoji is not custom
    let parsed = parse(emoji, { assetType: "png" }); // Parses the emoji
    if (!parsed[0]) return message.channel.send('Please make sure you state a valid emoji to enlarge!')
    embed.setImage(parsed[0].url); // Sets the embed image as the enlarged emoji
    message.channel.send(embed)
}

}
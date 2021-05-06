const Discord = require ('discord.js')
const { parse } = require('twemoji-parser')
module.exports.config = {
    name: "addemoji",
    aliases: [],
    description: 'This command will allow the bot to add the specfied emote to the server with the specified name',
    category: "misc",
    dmOnly: false, // Boolean
    guildOnly: true, // Boolean
    args: true, // Boolean
    usage: '<Emoji> <Emoji Name>',
    cooldown: 5, //seconds(s)
    guarded: false, // Boolean
    permissions: ["ADMINISTRATOR"],
}

module.exports.run = async (client, message, args) => {

if (!args[1]) return message.channel.send('Please make sure you state a name to give the emoji!')    
let emoji = Discord.Util.parseEmoji(args[0]); // Parsing the first argument as an emoji

let embed = new Discord.MessageEmbed()
.setTitle('Your New Emoji')
.setDescription(`Successfully created your emoji!`)
.setColor('#36393f')

if (emoji.id) {

await message.guild.emojis.create(`https://cdn.discordapp.com/emojis/${emoji.id}.${emoji.animated ? "gif" : "png"}`, `${args.splice(1).join(" ")}`).then(async () => { // Creating the specified emoji with the specified name
message.reply(embed)
})} else if (!emoji.id) {

let parsed = parse(emoji, { assetType: "png" });
if (!parsed[0]) return message.channel.send('Please make sure you state a valid emoji to enlarge!')

await message.guild.emojis.create(parsed, `${args.splice(1).join(" ")}`).then(async () => { // Creating the specified emoji with the specified name
message.reply(embed)
})
}}
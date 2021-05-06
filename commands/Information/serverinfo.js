const Discord = require ('discord.js')
module.exports.config = {
    name: "serverinfo",
    aliases: [],
    category: "information",
    dmOnly: false, // Boolean
    guildOnly: true, // Boolean
    args: false, // Boolean
    usage: '',
    cooldown: 5, //seconds(s)
    guarded: false, // Boolean
    permissions: ["SEND_MESSAGES"],
}

module.exports.run = async (client, message, args) => {

const Owner = client.users.cache.get(message.guild.ownerID)

let VC = []
let Text = []

await message.guild.channels.cache.forEach(async channel => {

if (channel.type === 'text') {
Text.push(channel.name)
} else if (channel.type === 'voice') {
VC.push(channel.name)
}})

const embed = new Discord.MessageEmbed()
.setAuthor(`${message.guild.name} Server Info`, message.guild.iconURL())
.setColor('#36393f')
.setFooter(`Guild ID: ${message.guild.id}`)
.setTimestamp()
.addFields(
    {name: 'Server Owner', value: `\`\`\`${Owner.tag}\`\`\``, inline: true},
    {name: 'Member Count', value: `\`\`\`${message.guild.memberCount}\`\`\``, inline: true},
    {name: 'Role Count', value: `\`\`\`${message.guild.roles.cache.size}\`\`\``, inline: true},
    {name: 'Channel Count', value: `\`\`\`${message.guild.channels.cache.size}\`\`\``, inline: true},
    {name: 'Text Channel Count', value: `\`\`\`${Text.length}\`\`\``, inline: true},
    {name: 'Voice Channel Count', value: `\`\`\`${VC.length}\`\`\``, inline: true}
    
)

message.reply(embed)

}

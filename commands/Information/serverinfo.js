const Discord = require ('discord.js')
module.exports.config = {
    name: "serverinfo",
    aliases: [],
    description: 'This command will display some interesting information about the server',
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

const Owner = client.users.cache.get(message.guild.ownerID) // Getting the owner user 

let VC = []
let Text = []

await message.guild.channels.cache.forEach(async channel => { // Looping through each channel in the guild

if (channel.type === 'text') {
Text.push(channel.name) // If the channel type is text it will push it into the text array
} else if (channel.type === 'voice') {
VC.push(channel.name) // If the channel type is voice it will push it into the VC array
}})

const embed = new Discord.MessageEmbed()
.setAuthor(`${message.guild.name} Server Info`, message.guild.iconURL())
.setColor('#36393f')
.setFooter(`Guild ID: ${message.guild.id}`)
.setTimestamp()
.addFields(
    {name: 'Server Owner', value: `\`\`\`${Owner.tag}\`\`\``, inline: true}, // Displaying the server owner tag
    {name: 'Member Count', value: `\`\`\`${message.guild.memberCount}\`\`\``, inline: true}, // Displaying the server member count
    {name: 'Role Count', value: `\`\`\`${message.guild.roles.cache.size}\`\`\``, inline: true}, // Displaying the role count of the server
    {name: 'Channel Count', value: `\`\`\`${message.guild.channels.cache.size}\`\`\``, inline: true}, // Displaying the channel count of the server
    {name: 'Text Channel Count', value: `\`\`\`${Text.length}\`\`\``, inline: true}, // Displaying how many text channels tere are 
    {name: 'Voice Channel Count', value: `\`\`\`${VC.length}\`\`\``, inline: true} // Displaying how many voice channels there are
    
)

message.reply(embed)

}

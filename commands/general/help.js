const Discord = require ('discord.js')
const schema = require ('../../mongoose/prefix')
const configg = require ('../../configs/config.json')
module.exports.config = {
    name: "help",
    aliases: [],
    description: 'This will display the help embed with a list of all commands',
    category: "general",
    dmOnly: false, // Boolean
    guildOnly: true, // Boolean
    args: false, // Boolean
    usage: '',
    cooldown: 5, //seconds(s)
    guarded: false, // Boolean
    permissions: ["SEND_MESSAGES"],
}

module.exports.run = async (client, message, args) => {

let animals = []
let config = []
let fun = []
let general = []
let info = []
let misc = []
let moderation = []
let music = []

await client.commands.forEach(async command => {

if (command.config.category === 'animals') {
    animals.push(`\`${command.config.name}\``)
} else if (command.config.category === 'config') {
    config.push(`\`${command.config.name}\``)
} else if (command.config.category === 'fun') {
    fun.push(`\`${command.config.name}\``)
} else if (command.config.category === 'general') {
    general.push(`\`${command.config.name}\``)
} else if (command.config.category === 'information') {
    info.push(`\`${command.config.name}\``)
} else if (command.config.category === 'misc') {
    misc.push(`\`${command.config.name}\``)
} else if (command.config.category === 'moderation') {
    moderation.push(`\`${command.config.name}\``)
} else if (command.config.category === 'music') {
    music.push(`\`${command.config.name}\``)
}
            
})

const data = await schema.findOne({
    GuildID: message.guild.id
})

if (!args[0]) {


if (data) {

const embed = new Discord.MessageEmbed()
.setAuthor(`${client.user.username} Help`, client.user.displayAvatarURL({ dynamic: true, size: 512 }))
.setColor('#36393f')
.setDescription(`My prefix for this server is \`${data.Prefix}\``)
.setFooter(`To see more information on a command use the command ${data.Prefix}help <Command>`)
.addFields(
    {name: '**General**', value: general.join(" ")},
    {name: '**Fun**', value: fun.join(" ")},
    {name: '**Animals**', value: animals.join(" ")},
    {name: '**Music**', value: music.join(" ")},
    {name: '**Information**', value: info.join(" ")},
    {name: '**Config**', value: config.join(" ")},
    {name: '**Moderation**', value: moderation.join(" ")},
    {name: '**Miscellaneous**', value: misc.join(" ")},
    {name: '**Links**', value: `[**Invite Me**](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot) | [**Support Server**](https://discord.gg) | [**Source Code**](https://github.com/brxnson/Multi-Purpose-Discord-Bot)`}
)
    
message.reply(embed)

} else if (!data) {

const embed = new Discord.MessageEmbed()
.setAuthor(`${client.user.username} Help`, client.user.displayAvatarURL({ dynamic: true, size: 512 }))
.setColor('#36393f')
.setDescription(`My prefix for this server is \`>\``)
.setFooter(`To see more information on a command use the command >help <Command>`)
.addFields(
    {name: 'General', value: general.join(" ")},
    {name: 'Fun', value: fun.join(" ")},
    {name: 'Animals', value: animals.join(" ")},
    {name: 'Music', value: music.join(" ")},
    {name: 'Information', value: info.join(" ")},
    {name: 'Config', value: config.join(" ")},
    {name: 'Moderation', value: moderation.join(" ")},
    {name: 'Miscellaneousd', value: misc.join(" ")}
)

message.reply(embed)


}} else if (args[0]) {

if (data) {

let cmd = client.commands.get(args[0]) || client.commands.find(cmd => cmd.config.aliases && cmd.config.aliases.includes(args[0]));
if (!cmd) return message.channel.send(`No command found with that name or alias, feel free to see the list of commands using the command \`${data.Prefix}help\``)

if (cmd.config.aliases.length > 0) {

let HelpEmbed = new Discord.MessageEmbed()
.setTitle(`${cmd.config.name} Help`, message.author.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
.setColor('#36393f')
.addFields(
    {name: 'Command Description', value: cmd.config.description},
    {name: 'Usage', value: `\`${cmd.config.name}\``, inline: true},
    {name: 'Aliases', value: `\`${cmd.config.aliases}\``, inline: true},
    {name: 'Information', value: `For more information on a command do \`${data.Prefix}help <Command Name>\`\nIf you have any query about the bot feel free to join our support server: [**Invite**](https://discord.gg)`}
)
message.reply(HelpEmbed)

} else {

let HelpEmbed = new Discord.MessageEmbed()
.setTitle(`${cmd.config.name} Help`, message.author.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
.setColor('#36393f')
.addFields(
    {name: 'Command Description', value: cmd.config.description},
    {name: 'Usage', value: `\`${cmd.config.name}\``, inline: true},
    {name: 'Information', value: `For more information on a command do \`${data.Prefix}help <Command Name>\`\nIf you have any query about the bot feel free to join our support server: [**Invite**](https://discord.gg)`}
)
message.reply(HelpEmbed)

}

} else if (!data) {

let cmd = client.commands.get(args[0]) || client.commands.find(cmd => cmd.config.aliases && cmd.config.aliases.includes(args[0]));
if (!cmd) return message.channel.send(`No command found with that name or alias, feel free to see the list of commands using the command \`>help\``)


if (cmd.config.aliases.length > 0) {

let HelpEmbed = new Discord.MessageEmbed()
.setTitle(`${cmd.config.name} Help`, message.author.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
.setColor('#36393f')
.addFields(
    {name: 'Command Description', value: cmd.config.description},
    {name: 'Usage', value: `\`${cmd.config.name}\``, inline: true},
    {name: 'Aliases', value: `\`${cmd.config.aliases}\``, inline: true},
    {name: 'Information', value: `For more information on a command do \`>help <Command Name>\`\nIf you have any query about the bot feel free to join our support server: [**Invite**](https://discord.gg)`}
)
message.reply(HelpEmbed)
    
} else {
    
let HelpEmbed = new Discord.MessageEmbed()
.setTitle(`${cmd.config.name} Help`, message.author.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
.setColor('#36393f')
.addFields(
    {name: 'Command Description', value: cmd.config.description},
    {name: 'Usage', value: `\`${cmd.config.name}\``, inline: true},
    {name: 'Information', value: `For more information on a command do \`>help <Command Name>\`\nIf you have any query about the bot feel free to join our support server: [**Invite**](https://discord.gg)`}
)
message.reply(HelpEmbed)
    
}

}}}

const Discord = require ('discord.js')
const schema = require ('../../mongoose/prefix')
const config = require ('../../configs/config.json')
module.exports.config = {
    name: "help",
    aliases: [],
    category: "general",
    dmOnly: false, // Boolean
    guildOnly: true, // Boolean
    args: false, // Boolean
    usage: '',
    cooldown: 5, //seconds(s)
    guarded: false, // Boolean
    permissions: ["SEND_MESSAGES"],
}

module.exports.run = async (client, message) => {

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

if (data) {

const embed = new Discord.MessageEmbed()
.setAuthor(`${client.user.username} Help`, client.user.displayAvatarURL({ dynamic: true, size: 512 }))
.setColor('#36393f')
.setDescription(`My prefix for this server is \`${data.Prefix}\``)
.addFields(
    {name: '**General**', value: general.join(" ")},
    {name: '**Fun**', value: fun.join(" ")},
    {name: '**Animals**', value: animals.join(" ")},
    {name: '**Music**', value: music.join(" ")},
    {name: '**Information**', value: info.join(" ")},
    {name: '**Config**', value: config.join(" ")},
    {name: '**Moderation**', value: moderation.join(" ")},
    {name: '**Miscellaneous**', value: misc.join(" ")},
    {name: '**Links**', value: `[**Invite Me**](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot) | [**Support Server**](https://discord.gg)`}
)
    
message.reply(embed)

} else if (!data) {

const embed = new Discord.MessageEmbed()
.setAuthor(`${client.user.username} Help`, client.user.displayAvatarURL({ dynamic: true, size: 512 }))
.setColor('#36393f')
.setDescription(`My prefix for this server is \`>\``)
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

}}

const Discord = require ('discord.js')
module.exports.config = {
    name: "check",
    aliases: [],
    description: 'This command will allow you to check all of the users in a role and send them in an embed',
    category: "information",
    dmOnly: false, // Boolean
    guildOnly: true, // Boolean
    args: true, // Boolean
    usage: '<Role>',
    cooldown: 5, //seconds(s)
    guarded: false, // Boolean
    permissions: ["ADMINISTRATOR"],
}

module.exports.run = async (client, message, args) => {

let role = message.mentions.roles.first() // Defining the role as the first role mention in your message
if (!role) role = message.guild.roles.cache.find(r => r.id === args[0]) // Trying to find a role in your guild with the role id you stated in your first argument
if (!role) return message.channel.send('Please make sure you state a valid role to give to members that join!') // If a role was not found it will return with this message

let arr = []

await role.members.forEach(async member => {
arr.push(`${member}`)
})

let embed = new Discord.MessageEmbed()
.setAuthor(`${role.name} Members`, message.guild.iconURL())
.setColor('#36393f')
.setDescription(`There are ${role.members.size} members in ${role}\n\n${arr.join("\n")}`)

message.reply(embed).catch(err => {

let embed = new Discord.MessageEmbed()
.setAuthor(`${role.name} Members`, message.guild.iconURL())
.setColor('#36393f')
.setDescription(`There are ${role.members.size} members in ${role}`)
.setFooter(`There are too many members in the role to display them all`)

message.reply(embed)

})}
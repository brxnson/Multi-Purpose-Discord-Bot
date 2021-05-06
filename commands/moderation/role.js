const Discord = require ('discord.js')
module.exports.config = {
    name: "role",
    aliases: [],
    description: 'This command will remove the specified role from the specified user if they already have the role, if they do not have the role then they will be given it',
    category: "moderation",
    dmOnly: false, // Boolean
    guildOnly: true, // Boolean
    args: true, // Boolean
    usage: '<User> <Role>',
    cooldown: 5, //seconds(s)
    guarded: false, // Boolean
    permissions: ["ADMINISTRATOR"],
}

module.exports.run = async (client, message, args) => {

let user = message.mentions.members.first()
if (!user) user = message.guild.members.cache.find(u => u.id === args[0])
if (!user) return message.channel.send('Please make sure you state a valid user!') // If no valid user was specified then it will return

let role = message.mentions.roles.first()
if (!role) role = message.guild.roles.cache.find(r => r.id === args[1])
if (!role) return message.channel.send('Please make sure you state a valid role!') // If no valid role was specifed it will return

if (role.position > message.guild.me.roles.highest.position) {
    return message.channel.send(`Please make sure the specified role is below my highest role, else i cannot give or remove it!`) // If the role is higher than the clients highest role it will return
}

if (user.roles.cache.has(role.id)) { // If the user already has the role

await user.roles.remove(role.id).catch(err => {return message.channel.send('Please make sure the role is not above my highest role, and please make sure i have the \`Manage Roles\` permission!')}) // Removes the role from the user
let embed = new Discord.MessageEmbed()
.setTitle(`Role Removed`, user.user.displayAvatarURL({ dynamic: true, size: 512 }))
.setDescription(`Removed ${role} from ${user}`)
.setColor('#36393f')

message.channel.send(embed)

} else if (!user.roles.cache.has(role.id)) { // If user doesnt have the role

await user.roles.add(role.id).catch(err => {return message.channel.send('Please make sure the role is not above my highest role, and please make sure i have the \`Manage Roles\` permission!')}) // Adds the role to the user
let embed = new Discord.MessageEmbed()
.setTitle(`Role Added`, user.user.displayAvatarURL({ dynamic: true, size: 512 }))
.setDescription(`Added ${role} to ${user}`)
.setColor('#36393f')
    
message.channel.send(embed)

}}
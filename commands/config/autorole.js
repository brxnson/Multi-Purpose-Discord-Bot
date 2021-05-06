const Discord = require ('discord.js')
const schema = require ('../../mongoose/AutoRole')
module.exports.config = {
    name: "autorole",
    aliases: [],
    category: "config",
    dmOnly: false, // Boolean
    guildOnly: true, // Boolean
    args: true, // Boolean
    usage: '<role>',
    cooldown: 5, //seconds(s)
    guarded: false, // Boolean
    permissions: ["ADMINISTRATOR"],
}

module.exports.run = async (client, message, args) => {

let role = message.mentions.roles.first()
if (!role) role = message.guild.roles.cache.find(r => r.id === args[0])
if (!role) return message.channel.send('Please make sure you state a valid role to give to members that join!')

let data = await schema.findOne({
    GuildID: message.guild.id
})

if (data) {

await schema.findOneAndDelete({
    GuildID: message.guild.id
})

message.channel.send(`The auto role has been disabled, to start the auto role again run the command with another role!`)

} else if (!data) {

    
    let newData = new schema({
        GuildName: message.guild.name,
        GuildID: message.guild.id,
        RoleID: role.id
    })
    
    newData.save()
    
    message.channel.send(`The auto role has been set to ${role}`)
    
    }

}

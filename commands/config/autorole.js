const Discord = require ('discord.js')
const schema = require ('../../mongoose/AutoRole') // Defining the schema that is used in the mongoose database
module.exports.config = {
    name: "autorole",
    aliases: [],
    description: 'This will let you make the bot give a role to someone as soon as they join the server, make sure you state a valid role to give the users',
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

let role = message.mentions.roles.first() // Defining the role as the first role mention in your message
if (!role) role = message.guild.roles.cache.find(r => r.id === args[0]) // Trying to find a role in your guild with the role id you stated in your first argument
if (!role) return message.channel.send('Please make sure you state a valid role to give to members that join!') // If a role was not found it will return with this message

let data = await schema.findOne({
    GuildID: message.guild.id // Trying to find the message guild id from the database
})

if (data) { 

await schema.findOneAndDelete({ // If the guild id was found it will delete the data and disable the autorole
    GuildID: message.guild.id
})

message.channel.send(`The auto role has been disabled, to start the auto role again run the command with another role!`) // It will then respond with this message once the data has been deleted

} else if (!data) {

    
    let newData = new schema({ // Defining the new data if the guild id was not found
        GuildName: message.guild.name,
        GuildID: message.guild.id,
        RoleID: role.id
    })
    
    newData.save() // Saving the data to the database
    
    message.channel.send(`The auto role has been set to ${role}`) // Replying with this message once the data has been saved
    
    }

}

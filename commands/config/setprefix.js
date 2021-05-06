const Discord = require ('discord.js')
module.exports.config = {
    name: "setprefix",
    aliases: [],
    description: 'This will allow you to set the prefix for the message guild, this will update the prefix so all commands work with that prefix instead of \`>\`.',
    category: "config",
    dmOnly: false, // Boolean
    guildOnly: true, // Boolean
    args: true, // Boolean
    usage: '<prefix>',
    cooldown: 10, //seconds(s)
    guarded: false, // Boolean
    permissions: ["ADMINISTRATOR"],
}

module.exports.run = async (client, message, args) => {

const schema = require ('../../mongoose/prefix') // Defining the schema

await schema.findOneAndUpdate({ // Finding the guild id in the database and updating the data
    GuildID: message.guild.id
}, {
    GuildName: message.guild.name,
    GuildID: message.guild.id,
    Prefix: args[0] // Setting the new prefix
}, {
    upsert: true // Upsert makes it so if the guild isnt currently in the database it will make new data instead of updating
})

message.channel.send(`The prefix has been set to \`${args[0]}\``) // Replying telling you the prefix has been updated to your first argument

}

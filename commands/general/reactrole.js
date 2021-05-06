const Discord = require ('discord.js')
const { parse } = require('twemoji-parser')
const ChannelSchema = require ('../../mongoose/React-Channel')
const schema = require ('../../mongoose/ReactRole')
module.exports.config = {
    name: "reactrole",
    aliases: [],
    description: 'This command will let you add a react role to a message with a specified emoji, anyone that reacts to the message will get given the specified role!',
    category: "general",
    dmOnly: false, // Boolean
    guildOnly: true, // Boolean
    args: true, // Boolean
    usage: '<Message ID> <Role> <Emoji>',
    cooldown: 5, //seconds(s)
    guarded: false, // Boolean
    permissions: ["ADMINISTRATOR"],
}

module.exports.run = async (client, message, args) => {

let data = await ChannelSchema.findOne({
    GuildID: message.guild.id
})

if (data) {

let channel = client.channels.cache.get(data.ChannelID)

let emoji = Discord.Util.parseEmoji(args[2]);
let ReactMessage = await channel.messages.fetch(args[0])
let role = message.mentions.roles.first()
if (!role) role = message.guild.roles.cache.find(r => r.id === args[0])

if (!emoji || !ReactMessage | !role) { // If any of the required arguments are missing then it will return
    return message.channel.send('Please make sure all of your arguments are valid!')
}

if (emoji.id) {

const data2 = await schema.findOne({
    GuildID: message.guild.id
})
if (data2) {

await schema.findOneAndDelete({
    GuildID: message.guild.id
})

let newData = new schema({
    GuildName: message.guild.name,
    GuildID: message.guild.id,
    MessageID: ReactMessage.id,
    RoleID: role.id,
    ReactID: emoji.id,
    ReactName: null // If the emote is custom the it will set "ReactName" as null in the database
})

newData.save()
const FinalMessage = await message.channel.send('React started...') // Replying saying the react has started once the schema has been made
await ReactMessage.react(emoji.id).catch(err => {return message.channel.send('Please make sure i am in a guild with that emoji!'), FinalMessage.delete()})

} else if (!data2) {

let newData = new schema({
    GuildName: message.guild.name,
    GuildID: message.guild.id,
    MessageID: ReactMessage.id,
    RoleID: role.id,
    ReactID: emoji.id,
    ReactName: null
})
    
newData.save()
const FinalMessagee = await message.channel.send('React started...')
await ReactMessage.react(emoji.id).catch(err => {return message.channel.send('Please make sure i am in a guild with that emoji!'), FinalMessagee.delete()})

}

} else {

const data2 = await schema.findOne({
    GuildID: message.guild.id
})

if (data2) {

await schema.findOneAndDelete({
    GuildID: message.guild.id
})

let newData = new schema({
    GuildName: message.guild.name,
    GuildID: message.guild.id,
    MessageID: ReactMessage.id,
    RoleID: role.id,
    ReactName: emoji.name,
    ReactID: null
})
    
newData.save()
const FinalMessage = await message.channel.send('React started...')
await ReactMessage.react(emoji.name).catch(err => {return message.channel.send('Please make sure i am in a guild with that emoji!'), FinalMessage.delete()})

} else if (!data2) {

let newData = new schema({
    GuildName: message.guild.name,
    GuildID: message.guild.id,
    MessageID: ReactMessage.id,
    RoleID: role.id,
    ReactName: emoji.name,
    ReactID: null
})
        
newData.save()
const FinalMessagee = await message.channel.send('React started...')
await ReactMessage.react(emoji.name).catch(err => {return message.channel.send('Please make sure i am in a guild with that emoji!'), FinalMessagee.delete()})

}

}

} else {
    return message.channel.send('Please set a react channel using the command \`>setreactchannel\`')
}

}
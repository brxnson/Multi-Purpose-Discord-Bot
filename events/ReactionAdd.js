const Discord = require ('discord.js')
const schema = require ('../mongoose/ReactRole')

module.exports = async (client) => {

client.on("messageReactionAdd", async (reaction, user) => {
if (user.bot) return
        
try {

let data = await schema.findOne({
    GuildID: reaction.message.guild.id
})

if (data && reaction.message.id === data.MessageID) {
if (data.ReactName !== null && reaction.emoji.name === data.ReactName) {

let guild = client.guilds.cache.get(reaction.message.guild.id)
let member = guild.members.cache.find(u => u.id === user.id)

member.roles.add(data.RoleID)

} else if (data.ReactID !== null && reaction.emoji.id === data.ReactID) {

let guild = client.guilds.cache.get(reaction.message.guild.id)
let member = guild.members.cache.find(u => u.id === user.id)
    
member.roles.add(data.RoleID)

}}} catch (error) {
    return
}
        
})}
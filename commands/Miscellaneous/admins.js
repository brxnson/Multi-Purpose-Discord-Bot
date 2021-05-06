const Discord = require ('discord.js')
module.exports.config = {
    name: "listadmins",
    aliases: [],
    description: 'This command will list all the users in an embed that have the administrator permissions in the guild',
    category: "misc",
    dmOnly: false, // Boolean
    guildOnly: true, // Boolean
    args: false, // Boolean
    usage: '',
    cooldown: 5, //seconds(s)
    guarded: false, // Boolean
    permissions: ["SEND_MESSAGES"],
}

module.exports.run = async (client, message, args) => {

await message.guild.members.fetch() // Fetching the guild members so they can be looped through

let arr = [] // Defining the array for the members
message.guild.members.cache.forEach(async member => { // Looping through guild members

if (member.permissions.has("ADMINISTRATOR")) {
    arr.push(`<@${member.id}>`) // If the member has the ADMINISTRATOR permissions they get pushed into the array
}})

const embed = new Discord.MessageEmbed()
.setAuthor(`${message.guild.name} Administrators! [${arr.length}]`, message.guild.iconURL())
.setColor('#36393f')
.setDescription(arr.join("\n")) // Sending the array in the embed joined by a \n

message.channel.send(embed)

}
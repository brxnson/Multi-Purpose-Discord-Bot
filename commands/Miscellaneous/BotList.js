const Discord = require ('discord.js')
module.exports.config = {
    name: "botlist",
    aliases: [],
    description: 'This command will list all the users in your guild that are a bot',
    category: "misc",
    dmOnly: false, // Boolean
    guildOnly: true, // Boolean
    args: false, // Boolean
    usage: '',
    cooldown: 5, //seconds(s)
    guarded: false, // Boolean
    permissions: ["ADMINISTRATOR"],
}

module.exports.run = async (client, message, args) => {

await message.guild.members.fetch() // Fetching guild members so they are in the cache
let arr = [] // Defining the array for the members to be in

message.guild.members.cache.forEach(async member => { // Looping through each member in the guild
if (member.user.bot) {
arr.push(`<@${member.id}>`) // If the member is a bot they get pushed into the array
}
})

const embed = new Discord.MessageEmbed()
.setTitle(`${message.guild.name} Bot List [${arr.length}]`)
.setColor('#36393f')
.setDescription(`${arr.join("\n")}`) // Joining the array by a line and pushing it into the embed

message.reply(embed)

}

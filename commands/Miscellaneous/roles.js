const Discord = require ('discord.js')
module.exports.config = {
    name: "roles",
    aliases: [],
    description: 'This command will display all the guild roles in an embed',
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

let arr = []

await message.guild.roles.cache.forEach(async role => {

arr.push(`<@&${role.id}>`) // Pushing the role mention into the array

})

const embed = new Discord.MessageEmbed()
.setTitle(`${message.guild.name} Roles [${message.guild.roles.cache.size}]`)
.setColor('#36393f')
.setDescription(arr.join("\n")) // Adding the array into an embed

message.channel.send(embed)

}

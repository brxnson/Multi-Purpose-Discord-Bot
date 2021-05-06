const Discord = require ('discord.js')
module.exports.config = {
    name: "botlist",
    aliases: [],
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

message.guild.members.cache.forEach(async member => {
if (member.user.bot) {
arr.push(`<@${member.id}>`)
}
})

const embed = new Discord.MessageEmbed()
.setTitle(`${message.guild.name} Bot List [${arr.length}]`)
.setColor('#36393f')
.setDescription(`${arr.join("\n")}`)

message.reply(embed)

}

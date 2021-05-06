const Discord = require ('discord.js')
module.exports.config = {
    name: "setname",
    aliases: [],
    description: 'This will set the server name to the arguments you specify',
    category: "moderation",
    dmOnly: false, // Boolean
    guildOnly: true, // Boolean
    args: true, // Boolean
    usage: '<New Name>',
    cooldown: 5, //seconds(s)
    guarded: false, // Boolean
    permissions: ["ADMINISTRATOR"],
}

module.exports.run = async (client, message, args) => {

let oldName = message.guild.name // Defining the old name for the embed

await message.guild.setName(args.join(" ")) // Setting the server name to the arguments joined

const embed = new Discord.MessageEmbed()
.setTitle('Server Name Changed', message.guild.iconURL())
.setColor('#36393f')
.addFields(
    {name: 'Old Name', value: `\`\`\`${oldName}\`\`\``},
    {name: 'New Name', value: `\`\`\`${message.guild.name}\`\`\``}
)

message.reply(embed) // Sending an embed saying the old name and new name

}
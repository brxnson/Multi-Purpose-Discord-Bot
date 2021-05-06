const Discord = require ('discord.js')
module.exports.config = {
    name: "bug",
    aliases: [],
    description: 'This command will allow you to report a bug to the developer. Explain the bug you found and the information will be sent to the developer!',
    category: "misc",
    dmOnly: false, // Boolean
    guildOnly: false, // Boolean
    args: true, // Boolean
    usage: '<bug found>',
    cooldown: 5, //seconds(s)
    guarded: false, // Boolean
    permissions: ["SEND_MESSAGES"],
}

module.exports.run = async (client, message, args) => {

const channel = client.channels.cache.get('819688606780227635') // Defining the channel to send the bug to. Make sure this is your channel ID!

const embed = new Discord.MessageEmbed()
.setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true, size: 512 }))
.setColor('#36393f')
.setTimestamp()
.setFooter(`Reporter ID: ${message.author.id}`)
.addFields(
    {name: 'Bug Reported', value: `${args.join(" ")}`} // Adding a field with the bug that was reported
)

channel.send(embed)

}
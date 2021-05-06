const Discord = require ('discord.js')
module.exports.config = {
    name: "bug",
    aliases: [],
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

const channel = client.channels.cache.get('819688606780227635')

const embed = new Discord.MessageEmbed()
.setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true, size: 512 }))
.setColor('#36393f')
.setTimestamp()
.setFooter(`Reporter ID: ${message.author.id}`)
.addFields(
    {name: 'Bug Reported', value: `${args.join(" ")}`}
)

channel.send(embed)

}
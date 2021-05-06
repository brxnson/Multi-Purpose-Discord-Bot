const Discord = require ('discord.js')
const axios = require ('axios')
module.exports.config = {
    name: "chucknorris",
    aliases: [],
    category: "fun",
    dmOnly: false, // Boolean
    guildOnly: false, // Boolean
    args: false, // Boolean
    usage: '',
    cooldown: 5, //seconds(s)
    guarded: false, // Boolean
    permissions: ["SEND_MESSAGES"],
}

module.exports.run = async (client, message, args) => {

axios({
    method: "get",
    url: "https://api.chucknorris.io/jokes/random"
}).then(async res => {

const embed = new Discord.MessageEmbed()
.setColor('#36393f')
.setTimestamp()
.setFooter(`Invoked by ${message.author.tag}`)

.setTitle(res.data.value)

message.reply(embed)

}).catch(err => message.channel.send('An error has occured whilst fetching that data!'))

}

const Discord = require ('discord.js')
const axios = require ('axios')
module.exports.config = {
    name: "fox",
    aliases: [],
    category: "animals",
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
    url: "https://randomfox.ca/floof/"
}).then(async res => {

const embed = new Discord.MessageEmbed()
.setTitle('Your Fox Image')
.setColor('#36393f')
.setURL(res.data.link)
.setImage(res.data.image)
.setFooter(`Invoked by ${message.author.tag}`)
.setTimestamp()

message.channel.send(embed)

}).catch(err => message.channel.send('An error has occured whilst fetching that data!'))

}

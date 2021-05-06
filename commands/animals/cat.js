const Discord = require ('discord.js')
const axios = require ('axios')
const ApiKey = require ('../../configs/Api-Keys.json')
module.exports.config = {
    name: "cat",
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
    method: 'get',
    url: 'https://api.thecatapi.com/v1/images/search',
    headers: {'api-key': `${ApiKey.CatKey}`}
}).then(res => {

const embed = new Discord.MessageEmbed()
.setImage(res.data[0].url)
.setColor('#36393f')
.setFooter(`Invoked by  ${message.author.tag}`)
.setTimestamp()

message.reply(embed)

}).catch(err => message.channel.send('An error has occured whilst fetching that data!'))

}

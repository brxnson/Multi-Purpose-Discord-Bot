const Discord = require ('discord.js')
const axios = require ('axios')
module.exports.config = {
    name: "meme",
    aliases: [],
    category: "fun",
    dmOnly: false, // Boolean
    guildOnly: false, // Boolean
    args: false, // Boolean
    usage: '',
    cooldown: 5, //seconds(s)
    guarded: false, // Boolean
    permissions: [],
}

module.exports.run = async (client, message, args) => {

axios({
    method: 'get',
    url: 'http://meme-api.herokuapp.com/gimme'
}).then(async res => {

let x = 0

while (x < 1) {

if (res.data.nsfw === false) {

const embed = new Discord.MessageEmbed()
.setTitle(res.data.title)
.setURL(res.data.postLink)
.setImage(res.data.preview[2])
.setFooter(`Pulled from the subreddit: ${res.data.subreddit}`)
.setColor('#36393f')

message.reply(embed)

x++
}}

}).catch(err => message.channel.send('An error has occured whilst fetching that data!'))


}

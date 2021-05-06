const Discord = require ('discord.js')
const axios = require ('axios')
module.exports.config = {
    name: "chucknorris",
    aliases: [],
    description: 'This will use the api to fetch a random chuck norris joke and send it in an embed',
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
    method: "get", // Using a GET method for the api request
    url: "https://api.chucknorris.io/jokes/random" // Setting the URL to use for the api request
}).then(async res => {

const embed = new Discord.MessageEmbed()
.setColor('#36393f')
.setTimestamp()
.setFooter(`Invoked by ${message.author.tag}`)

.setTitle(res.data.value) // Setting the embed title as the joke from the api

message.reply(embed)

}).catch(err => message.channel.send('An error has occured whilst fetching that data!'))

}

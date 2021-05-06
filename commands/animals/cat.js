const Discord = require ('discord.js')
const axios = require ('axios') // Module used for the api request
const ApiKey = require ('../../configs/Api-Keys.json') // Make sure you have your api key pasted in this folder else it will error
module.exports.config = {
    name: "cat",
    aliases: [],
    description: 'This command will display a picture of a cat that is pulled from the [Cat Api](https://thecatapi.com)',
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
    method: 'get', // Using a GET method for the api request
    url: 'https://api.thecatapi.com/v1/images/search', // Defining the URL to pull the request from, this will get the photo from that URL
    headers: {'api-key': `${ApiKey.CatKey}`} // Defining the header for the api key that you put into the api key file
}).then(res => {

const embed = new Discord.MessageEmbed() // Defining the embed
.setImage(res.data[0].url) // Setting the embed image as the image that has been fetched
.setColor('#36393f')
.setFooter(`Invoked by  ${message.author.tag}`)
.setTimestamp()

message.reply(embed)

}).catch(err => message.channel.send('An error has occured whilst fetching that data!')) // If there was an error whilst fetching the api request it will return with this message

}

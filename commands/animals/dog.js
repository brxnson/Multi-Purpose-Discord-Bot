const Discord = require ('discord.js')
const axios = require ('axios') // Defining the module for the api request
module.exports.config = {
    name: "dog",
    aliases: [],
    description: 'This command will display a picture of a dog that has been pulled from an api request.',
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
    method: 'get', // Using a GET request for the api request
    url: "https://dog.ceo/api/breeds/image/random" // Defining the URL to use for the api request
}).then(async res => {

const embed = new Discord.MessageEmbed()
.setImage(res.data.message) // Setting the embed message as the fetched image from the api
.setColor('#36393f')
.setTimestamp()
.setFooter(`Invoked by ${message.author.tag}`)

message.reply(embed)

}).catch(err => message.channel.send('An error has occured whilst fetching that data!')) // If there was an error getting the api request then it will return with this message

}

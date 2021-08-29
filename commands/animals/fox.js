const Discord = require ('discord.js')
const axios = require ('axios') // Defining the module used in the api request
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
    method: "get", // Using the GET method for the api request
    url: "https://randomfox.ca/floof/" // Defining the URL used in the api request
}).then(async res => {

const embed = new Discord.MessageEmbed()
.setTitle('Your Fox Image')
.setColor('#36393f')
.setURL(res.data.link) // Setting the embed URL link as the link to the image
.setImage(res.data.image) // Setting the embed image as the fetched image from the api request
.setFooter(`Invoked by ${message.author.tag}`)
.setTimestamp()

message.channel.send(embed)

}).catch(err => message.channel.send('An error has occured whilst fetching that data')) // If there was an error getting the api request then it will return with this message

}

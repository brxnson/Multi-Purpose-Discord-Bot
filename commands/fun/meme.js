const Discord = require ('discord.js')
const axios = require ('axios')
module.exports.config = {
    name: "meme",
    aliases: [],
    description: 'This will get a random meme from the meme api that gets memes from reddit',
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
    method: 'get', // Using the GET method for the api request
    url: 'http://meme-api.herokuapp.com/gimme' // Setting the URL to use for the api request
}).then(async res => {

let x = 0 // Defining X so that we can use it to loop

while (x < 1) { // Looping through X while it is less than 1

if (res.data.nsfw === false) { // Checking if the meme fetched is not a nsfw meme

const embed = new Discord.MessageEmbed()
.setTitle(res.data.title)
.setURL(res.data.postLink)
.setImage(res.data.preview[2]) // Setting the embed image as the meme
.setFooter(`Pulled from the subreddit: ${res.data.subreddit}`)
.setColor('#36393f')

message.reply(embed)

x++ // If it was not NSFW then it will add one to x so that is is bigger than 0
}}

}).catch(err => message.channel.send('An error has occured whilst fetching that data!'))


}

const Discord = require ('discord.js')
const axios = require ('axios')
module.exports.config = {
    name: "meowfact",
    aliases: [],
    description: 'This will get a random fact about cats from the api',
    category: "fun",
    dmOnly: false, // Boolean
    guildOnly: false, // Boolean
    args: false, // Boolean
    usage: '',
    cooldown: 5, //seconds(s)
    guarded: false, // Boolean
    permissions: ["SEND_MESSAGE"],
}

module.exports.run = async (client, message, args) => {

axios({
    method: "get", // Using a GET method for the api request
    url: "https://meowfacts.herokuapp.com" // Setting the URL we use for the api request
}).then(async res => {
   
    const embed = new Discord.MessageEmbed()
    .setColor('#36393f')
    .setTimestamp()
    .setFooter(`Invoked by ${message.author.tag}`)

    .setTitle(res.data.data[0]) // Setting the embed title as the fact

    message.reply(embed)

}).catch(err => message.channel.send('An error has occured whilst fetching that data!'))

}

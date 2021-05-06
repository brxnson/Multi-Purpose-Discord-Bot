const Discord = require ('discord.js')
const axios = require ('axios')
module.exports.config = {
    name: "joke",
    aliases: [],
    description: 'This will use the api to get a random joke and send it in an embed',
    category: "fun",
    dmOnly: false, // Boolean
    guildOnly: false, // Boolean
    args: false, // Boolean
    usage: '<> <>',
    cooldown: 5, //seconds(s)
    guarded: false, // Boolean
    permissions: ["SEND_MESSAGES"],
}

module.exports.run = async (client, message, args) => {

axios({
    method: 'get', // Using a GET method for the api request
    url: 'https://icanhazdadjoke.com/', // Setting the URL to use for the apu request
    headers: {'Accept': 'text/plain'} // Setting the header for the api request
}).then(async res => {
    
    const embed = new Discord.MessageEmbed()
    .setColor('#36393f')
    .setTimestamp()
    .setFooter(`Invoked by ${message.author.tag}`)

    .setTitle(res.data) // Setting the embed title as the joke fetched from the api

    message.reply(embed)

}).catch(err => message.channel.send('An error has occured whilst fetching that data!'))

}

const Discord = require ('discord.js')
const axios = require ('axios')
module.exports.config = {
    name: "fact",
    aliases: [],
    description: 'This will get a random fact for you from the api and send it in an embed',
    category: "general",
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
    url: "https://uselessfacts.jsph.pl/random.json?language=en" // Setting the URL for the api request
}).then(res => {
    
    const embed = new Discord.MessageEmbed()
    .setColor('#36393f')
    .setTitle('Your Fact')
    .setURL(res.data.source_url)
    .setDescription(`**${res.data.text}**`) // Setting the embed description as the fact

    message.reply(embed)
})

}
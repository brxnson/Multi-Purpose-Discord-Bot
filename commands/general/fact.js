const Discord = require ('discord.js')
const axios = require ('axios')
module.exports.config = {
    name: "fact",
    aliases: [],
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
    method: 'get',
    url: "https://uselessfacts.jsph.pl/random.json?language=en"
}).then(res => {
    
    const embed = new Discord.MessageEmbed()
    .setColor('#36393f')
    .setTitle('Your Fact')
    .setURL(res.data.source_url)
    .setDescription(`**${res.data.text}**`)

    message.reply(embed)
})

}
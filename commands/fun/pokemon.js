const axios = require ('axios')
const Discord = require ('discord.js')
module.exports.config = {
    name: "pokemon",
    aliases: [],
    category: "fun",
    dmOnly: false, // Boolean
    guildOnly: false, // Boolean
    args: true, // Boolean
    usage: '<pokemon>',
    cooldown: 5, //seconds(s)
    guarded: false, // Boolean
    permissions: ["SEND_MESSAGES"],
}

module.exports.run = async (client, message, args) => {

axios({
    method: "get",
    url: `https://pokeapi.co/api/v2/pokemon/${args.join(" ")}`
}).then(async res => {
    
    const embed = new Discord.MessageEmbed()
    .setTitle(`Info for ${res.data.species.name}`)
    .setColor(`#36393f`)
    .setImage(res.data.sprites.front_default)
    .addFields(
        {name: 'Name', value: res.data.species.name, inline: true},
        {name: 'Height', value: res.data.height, inline: true},
        {name: 'Weight', value: res.data.weight, inline: true},
    )

    message.reply(embed)

}).catch(err => message.channel.send('An error has occured, please make sure your argument is a valid pokemon!'))

}

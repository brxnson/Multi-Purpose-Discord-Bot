const axios = require ('axios')
const Discord = require ('discord.js')
module.exports.config = {
    name: "pokemon",
    aliases: [],
    description: 'This command will display some information about the specified pokemon',
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
    method: "get", // Using a GET method for the api request
    url: `https://pokeapi.co/api/v2/pokemon/${args.join(" ")}` // Setting the URL for the request and setting the pokemon as your arguments
}).then(async res => {
    
    const embed = new Discord.MessageEmbed()
    .setTitle(`Info for ${res.data.species.name}`) // Setting the title as the pokemon name
    .setColor(`#36393f`)
    .setImage(res.data.sprites.front_default) // Setting the image as an image of the specifed pokemon
    .addFields(
        {name: 'Name', value: res.data.species.name, inline: true},
        {name: 'Height', value: res.data.height, inline: true},
        {name: 'Weight', value: res.data.weight, inline: true},
    ) // Adding fields for the pokemon data

    message.reply(embed)

}).catch(err => message.channel.send('An error has occured, please make sure your argument is a valid pokemon!')) // If there was an error using the api request it will return

}

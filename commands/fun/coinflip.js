const Discord = require ('discord.js')
const random = require ('random')
module.exports.config = {
    name: "coinflip",
    aliases: ["cf"],
    description: 'Flip a coin and get an answer of either heads or tails',
    category: "fun",
    dmOnly: false, // Boolean
    guildOnly: false, // Boolean
    args: false, // Boolean
    usage: '',
    cooldown: 3, //seconds(s)
    guarded: false, // Boolean
    permissions: ["SEND_MESSAGES"],
}

module.exports.run = async (client, message, args) => {

const coin = [`heads`, `tails`,]; // Defining the array of answers for the coinflip
const index = random.int(0, coin.length - 1)
    
let result = (coin[index])
const Embed = new Discord.MessageEmbed()
.setColor('#36393f')
.setTitle(`Coin Flip Result`)
.setDescription(`The coin was flipped and the result is **${result}**`) // Setting the embed description as the coinflip result
.setFooter(`Invoked by ${message.author.tag}`)
                
message.reply(Embed);

}

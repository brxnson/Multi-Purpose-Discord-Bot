const Discord = require ('discord.js')
const random = require ('random')
module.exports.config = {
    name: "8ball",
    aliases: [],
    description: 'This command will let the bot give you a response on a question that comes from an 8Ball.',
    category: "fun",
    dmOnly: false, // Boolean
    guildOnly: true, // Boolean
    args: true, // Boolean
    usage: '<Question>',
    cooldown: 3, //seconds(s)
    guarded: false, // Boolean
    permissions: ["SEND_MESSAGES"],
}

module.exports.run = async (client, message, args) => {

let answers = ['As i see it, yes.', 'Ask again later.', 'Better not tell you now.', 'Cannot predict now.', 'Concentrate and ask again', 'Don\'t count on it.', 'It is certain.', 'It is decidedly so.', 'Most Likely', 'My reply is no', 'My sources say no', 'Outlook not so good', 'Outlook good', 'Reply hazy, try again', 'Signs point to yes', 'Very doubtful', 'Without a doubt', 'Yes', 'Yes- Definitely', 'You may rely on it'] // Defining the array for the answers
let response = random.int(0, answers.length - 1) // Generating a random number between 0 and the answers array length

let embed = new Discord.MessageEmbed()
.setTitle('8Ball Response')
.setColor('#36393f')
.setDescription(answers[response]) // Using the answers array aswell with the random number to display the bots response

message.reply(embed)
}
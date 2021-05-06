const Discord = require ('discord.js')
module.exports.config = {
    name: "say",
    aliases: ['speak'],
    description: 'This command will make the bot respond with your arguments',
    category: "general",
    dmOnly: false, // Boolean
    guildOnly: true, // Boolean
    args: true, // Boolean
    usage: '<text>',
    cooldown: 5, //seconds(s)
    guarded: false, // Boolean
    permissions: ["SEND_MESSAGES"],
}

module.exports.run = async (client, message, args) => {

let text = args.join(" ") // Defining text as all arguments
message.channel.send(text) 

}
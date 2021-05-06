const Discord = require ('discord.js')
module.exports.config = {
    name: "say",
    aliases: [],
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

let text = args.join(" ")
message.channel.send(text)

}
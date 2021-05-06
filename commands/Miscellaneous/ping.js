const Discord = require ('discord.js')
module.exports.config = {
    name: "ping",
    aliases: [],
    category: "misc",
    dmOnly: false, // Boolean
    guildOnly: false, // Boolean
    args: false, // Boolean
    usage: '',
    cooldown: 10, //seconds(s)
    guarded: false, // Boolean
    permissions: ["ADMINISTRATOR"],
}

module.exports.run = async (client, message, args) => {

const pingMessage = await message.channel.send("Pong!");
    
const ping = pingMessage.createdTimestamp - message.createdTimestamp

pingMessage.edit(`Pong! \`${ping}ms\``)

}

const Discord = require ('discord.js')
module.exports.config = {
    name: "ping",
    aliases: [],
    description: 'This command will tell you the latency between sending the message and editing the message in MS',
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
    
const ping = pingMessage.createdTimestamp - message.createdTimestamp // Calculating the time

pingMessage.edit(`Pong! \`${ping}ms\``)

}

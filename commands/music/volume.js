const Discord = require ('discord.js')
const emotes = require ('../../configs/emotes.json')
module.exports.config = {
    name: "volume",
    aliases: [],
    category: "music",
    dmOnly: false, // Boolean
    guildOnly: true, // Boolean
    args: true, // Boolean
    usage: '<Volume>',
    cooldown: 5, //seconds(s)
    guarded: false, // Boolean
    permissions: ["SEND_MESSAGES"],
}

module.exports.run = async (client, message, args) => {

    if (!message.member.voice.channel) return message.channel.send(`:warning: - You're not currently in a voice channel!`);

    if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`:warning: - You are not in the same voice channel as the bot!`);

    if (!client.player.getQueue(message)) return message.channel.send(`:warning: - There is no music playing!`);

    if (!args[0] || isNaN(args[0]) || args[0] === 'Infinity') return message.channel.send(`:warning: - Please enter a valid number!`);

    if (Math.round(parseInt(args[0])) < 1 || Math.round(parseInt(args[0])) > 100) return message.channel.send(`:warning: - Please enter a number between 1 and 100!`);

    client.player.setVolume(message, parseInt(args[0]));

    message.channel.send(`${emotes.music} - Volume set to **${parseInt(args[0])}%** !`);

}
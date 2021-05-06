const Discord = require ('discord.js')
const emotes = require ('../../configs/emotes.json')
module.exports.config = {
    name: "volume",
    aliases: [],
    description: 'This command will allow you to change the volume of the music between \`1 - 100\`',
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

    if (!message.member.voice.channel) return message.channel.send(`:warning: - You're not currently in a voice channel!`); // If the author is not in a voice channel it will return

    if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`:warning: - You are not in the same voice channel as the bot!`); // If the author is in a different voice channel to the client it will return

    if (!client.player.getQueue(message)) return message.channel.send(`:warning: - There is no music playing!`); // If no music is currently playing it will return

    if (!args[0] || isNaN(args[0]) || args[0] === 'Infinity') return message.channel.send(`:warning: - Please enter a valid number!`);

    if (Math.round(parseInt(args[0])) < 1 || Math.round(parseInt(args[0])) > 100) return message.channel.send(`:warning: - Please enter a number between 1 and 100!`); // If the number is not between 1-100 it will return

    client.player.setVolume(message, parseInt(args[0])); // Setting the volume of the music

    message.channel.send(`${emotes.music} - Volume set to **${parseInt(args[0])}%** !`);

}
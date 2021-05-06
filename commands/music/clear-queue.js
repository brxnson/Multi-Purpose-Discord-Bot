const Discord = require ('discord.js')
const emotes = require ('../../configs/emotes.json')
module.exports.config = {
    name: "clear",
    aliases: [],
    category: "music",
    dmOnly: false, // Boolean
    guildOnly: true, // Boolean
    args: false, // Boolean
    usage: '',
    cooldown: 10, //seconds(s)
    guarded: false, // Boolean
    permissions: ["SEND_MESSAGES"],
}

module.exports.run = async (client, message, args) => {

    const track = client.player.nowPlaying(message);

    if (!message.member.voice.channel) return message.channel.send(`:warning: - You're not in a voice channel!`);

    if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`:warning: - I am not currently in your voice channel!`);

    if (client.player.getQueue(message).tracks.length <= 1) return message.channel.send(`:warning: - There isn\'t a queue.`);

    client.player.clearQueue(message);

    message.channel.send(`${emotes.music} - The queue has been reset!`);

}

const Discord = require ('discord.js')
const emotes = require ('../../configs/emotes.json')
module.exports.config = {
    name: "pause",
    aliases: [],
    category: "music",
    dmOnly: false, // Boolean
    guildOnly: true, // Boolean
    args: false, // Boolean
    usage: '<> <>',
    cooldown: 5, //seconds(s)
    guarded: false, // Boolean
    permissions: ["SEND_MESSAGES"],
}

module.exports.run = async (client, message, args) => {

    if (!message.member.voice.channel) return message.channel.send(`:warning: - You are not in a voice channel!`);

    if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`:warning: - You are not in the same voice channel!`);

    if (!client.player.getQueue(message)) return message.channel.send(`:warning: - There is no music currently playing!`);

    if (client.player.getQueue(message).paused) return message.channel.send(`:warning: - The music is already paused!`);

    client.player.pause(message);

    message.channel.send(`${emotes.music} - ${client.player.getQueue(message).playing.title} is now paused!`);

}


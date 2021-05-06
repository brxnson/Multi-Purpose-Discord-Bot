const Discord = require ('discord.js')
const emotes = require ('../../configs/emotes.json')
module.exports.config = {
    name: "shuffle",
    aliases: [],
    description: 'This will shuffle the current queue so that the queue is in a random order',
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

    if (!message.member.voice.channel) return message.channel.send(`:warning: - You're not in a voice channel!`); // If the author is not in a voice channel it will return

    if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`:warning: - You are not in the same voice channel as the bot!`); // If the author is not in the same voice channel as the client it will return

    if (!client.player.getQueue(message)) return message.channel.send(`:warning: - There isn\'t any music currently playing!`); // If there isnt a music currently playing then it will return

    client.player.shuffle(message); // Shuffling the queue

    return message.channel.send(`${emotes.music} - Shuffled **${client.player.getQueue(message).tracks.length}** songs!`);

}
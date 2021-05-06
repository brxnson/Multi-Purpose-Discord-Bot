const Discord = require ('discord.js')
const emotes = require ('../../configs/emotes.json')
module.exports.config = {
    name: "clear",
    aliases: [],
    description: 'This command will clear the music queue for the guild',
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

    if (!message.member.voice.channel) return message.channel.send(`:warning: - You're not in a voice channel!`); // If the author is not in a voice channel it will return

    if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`:warning: - I am not currently in your voice channel!`); // If the message author is in a different voice channel than the bot it will return

    if (client.player.getQueue(message).tracks.length <= 1) return message.channel.send(`:warning: - There isn\'t a queue.`); // If there isnt any songs in the current queue it will return

    client.player.clearQueue(message); // This will clear the current queue for the guild

    message.channel.send(`${emotes.music} - The queue has been reset!`); // Replying saying the queue has been cleared

}

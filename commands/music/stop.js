const Discord = require ('discord.js')
const emotes = require ('../../configs/emotes.json')
module.exports.config = {
    name: "stop",
    aliases: ["dc", "disconnect"],
    description: 'This command will stop the current playing music and will disconnect the bot from the voice channel',
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

    if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`:warning: - You are not in the same voice channel as the bot!`); // If the author is in a different channel to the client it will return

    if (!client.player.getQueue(message)) return message.channel.send(`:warning: - There isn\'t any music currently playing!`); // If there isnt any music currently playing it will return

    const track = client.player.nowPlaying(message);
    client.player.setRepeatMode(message, false); // Turning off loop mode if it is on
    client.player.stop(message); // Stopping the music

    message.channel.send(`${emotes.music} - ${track.title} has stopped!`);

}
const Discord = require ('discord.js')
const emotes = require ('../../configs/emotes.json')
module.exports.config = {
    name: "skip",
    aliases: ["next"],
    description: 'This command will skip the current playing song and play the next in queue song',
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

    if (!message.member.voice.channel) return message.channel.send(`:warning: - You're not in a voice channel!`); // If the author is not in a vouce channel it will return

    if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`:warning: - You are not in the same voice channel as the bot!`);

    if (!client.player.getQueue(message)) return message.channel.send(`:warning: - There isn\'t any music currently playing!`);

    const track = client.player.nowPlaying(message);
    client.player.skip(message);

    message.channel.send(`${emotes.music} - ${track.title} has been skipped!`);

}
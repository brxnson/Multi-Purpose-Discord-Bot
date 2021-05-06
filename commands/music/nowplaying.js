const Discord = require ('discord.js')
const emotes = require ('../../configs/emotes.json')
module.exports.config = {
    name: "playing",
    aliases: ["nowplaying"],
    description: 'This will display information about the currently playing song in your guild',
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

    if (!message.member.voice.channel) return message.channel.send(`:warning: - You're not currently in a voice channel!`); // If the message author is not in a voice channel it will return

    if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`:warning: - You are not in the same voice channel as the bot!`); // If the author is in a different channel than the client then it will return

    if (!client.player.getQueue(message)) return message.channel.send(`:warning: - No music currently playing!`); // If no queue is found then it will return

    const track = client.player.nowPlaying(message); // Defining the track as the currently playing song

    message.channel.send({
        embed: { // Defining the embed with all values about the song
            color: '#36393f',
            author: { name: track.title }, 
            fields: [


                { name: 'Duration', value: track.duration, inline: true },
                { name: 'Volume', value: client.player.getQueue(message).volume, inline: true },
                { name: 'Requested by', value: track.requestedBy.username, inline: true },


                { name: 'Progress bar', value: client.player.createProgressBar(message, { timecodes: true }), inline: false }
            ],
            thumbnail: { url: track.thumbnail },
            timestamp: new Date(),
        },
    }).catch(err => message.channel.send(':warning: - I do not have the correct permissions required for this command, please grant me the \`Embed Links\` permission!'))



}
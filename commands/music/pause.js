const Discord = require ('discord.js')
const emotes = require ('../../configs/emotes.json')
module.exports.config = {
    name: "pause",
    aliases: [],
    description: 'This will pause the current playing music in the guild, you can resume this music using the \`>resume\` command.',
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

    if (!message.member.voice.channel) return message.channel.send(`:warning: - You are not in a voice channel!`); // If the author is not in a voice channel it will return

    if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`:warning: - You are not in the same voice channel!`); // If the author is in a different voice channel to the client it will return

    if (!client.player.getQueue(message)) return message.channel.send(`:warning: - There is no music currently playing!`); // If there is no current queue it will return

    if (client.player.getQueue(message).paused) return message.channel.send(`:warning: - The music is already paused!`); // If the music is already paused then it will return

    client.player.pause(message); // Else it will pause the song

    message.channel.send(`${emotes.music} - ${client.player.getQueue(message).playing.title} is now paused!`);

}


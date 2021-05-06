const Discord = require ('discord.js')
const emotes = require ('../../configs/emotes.json')
module.exports.config = {
    name: "play",
    aliases: [],
    description: 'This will play the specified music into your current voice channel',
    category: "music",
    dmOnly: false, // Boolean
    guildOnly: true, // Boolean
    args: true, // Boolean
    usage: '<song>',
    cooldown: 5, //seconds(s)
    guarded: false, // Boolean
    permissions: ["SEND_MESSAGES"],
}

module.exports.run = async (client, message, args) => {

    if (!message.member.voice.channel) return message.channel.send(`:warning: - You are not in a voice channel!`); // If the author is not in a voice channel it will return

    if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`:warning: - You are not in the same voice channel as the bot!`); // If the author is not in the same voice channel as the client it will return

    if (!args[0]) return message.channel.send(`:warning: - Please provide a title or URL for a song!`); // If no arguments it will return

    client.player.play(message, args.join(" "), { firstResult: true }); // Start playing the specified song

}
const Discord = require ('discord.js')
const emotes = require ('../../configs/emotes.json')
module.exports.config = {
    name: "search",
    aliases: [],
    category: "music",
    dmOnly: false, // Boolean
    guildOnly: true, // Boolean
    args: true, // Boolean
    usage: '<Search Result>',
    cooldown: 5, //seconds(s)
    guarded: false, // Boolean
    permissions: ["SEND_MESSAGES"],
}

module.exports.run = async (client, message, args) => {

    if (!message.member.voice.channel) return message.channel.send(`:warning: - You're not currently in a voice channel!`);

    if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`:warning: - You are not in the same voice channel as the bot!`);

    if (!args[0]) return message.channel.send(`:warning: - Please indicate the title of a song!`);

    client.player.play(message, args.join(" "));


}
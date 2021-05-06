const Discord = require ('discord.js')
const emotes = require ('../../configs/emotes.json')
module.exports.config = {
    name: "shuffle",
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

    if (!message.member.voice.channel) return message.channel.send(`:warning: - You're not in a voice channel!`);

    if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`:warning: - You are not in the same voice channel as the bot!`);

    if (!client.player.getQueue(message)) return message.channel.send(`:warning: - There isn\'t any music currently playing!`);

    client.player.shuffle(message);

    return message.channel.send(`${emotes.music} - Shuffled **${client.player.getQueue(message).tracks.length}** songs!`);

}
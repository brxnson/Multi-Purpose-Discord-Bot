const Discord = require ('discord.js')
const emotes = require ('../../configs/emotes.json')
module.exports.config = {
    name: "loop",
    aliases: [],
    description: 'This command will loop the current playing song in your voice channel, to disable the loop just use the command again',
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

    if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`:warning: - You are not in the same voice channel as the bot!`); // If the author is in a different voice channel than the client it will return

    if (!client.player.getQueue(message)) return message.channel.send(`:warning: - There isn\'t any music currently playing!`); // If there isnt anything current playing then it will return

    if (args.join(" ").toLowerCase() === 'queue') { 
        if (client.player.getQueue(message).loopMode) {
            client.player.setLoopMode(message, false);
            return message.channel.send(`${emotes.music} - Looping has been turned off!`);
        } else {
            client.player.setLoopMode(message, true);
            return message.channel.send(`${emotes.music} - Looping has been turned on!`);
        };
    } else {
        if (client.player.getQueue(message).repeatMode) {
            client.player.setRepeatMode(message, false);
            return message.channel.send(`${emotes.music} - Looping has been turned off!`);
        } else {
            client.player.setRepeatMode(message, true);
            return message.channel.send(`${emotes.music} - Looping has been turned on!`);
        };
    };


}
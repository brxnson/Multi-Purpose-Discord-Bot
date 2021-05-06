const Discord = require ('discord.js')
const emotes = require ('../../configs/emotes.json')
module.exports.config = {
    name: "playing",
    aliases: ["nowplaying"],
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

    if (!message.member.voice.channel) return message.channel.send(`:warning: - You're not currently in a voice channel!`);

    if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`:warning: - You are not in the same voice channel as the bot!`);

    if (!client.player.getQueue(message)) return message.channel.send(`:warning: - No music currently playing!`);

    const track = client.player.nowPlaying(message);
    const filters = [];

    Object.keys(client.player.getQueue(message).filters).forEach((filterName) => client.player.getQueue(message).filters[filterName]) ? filters.push(filterName) : false;

    message.channel.send({
        embed: {
            color: message.guild.me.displayColor,
            author: { name: track.title },
            footer: { text: `Made with <3`},
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
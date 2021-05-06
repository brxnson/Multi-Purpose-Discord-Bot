const Discordjs = require ('discord.js')
const emotes = require ('../configs/emotes.json')

module.exports = (client, message, track) => {



    message.channel.send(`${emotes.music} - Now playing ${track.title}`);

    const trackembed = new Discordjs.MessageEmbed()
    .setAuthor(`${track.title}`)
    .setColor('#36393f')
    .setThumbnail(track.thumbnail)
    .setFooter('Made with <3')
    .setTimestamp()
    .addFields(
        { name: 'Requested by', value: track.requestedBy.username, inline: true },
        { name: 'Duration', value: track.duration, inline: true },
        { name: 'Volume', value: client.player.getQueue(message).volume, inline: true },

        
        { name: 'Progress bar', value: client.player.createProgressBar(message, { timecodes: true }), inline: true }
    )

    message.reply(trackembed).catch(err => message.channel.send(`${emotes.music} - Now playing ${track.title}`))


};
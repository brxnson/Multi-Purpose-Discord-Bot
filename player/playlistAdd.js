const emotes = require ('../configs/emotes.json')

module.exports = (client, message, queue, playlist) => {
    message.channel.send(`${emotes.music} - ${playlist.title} has been added to the queue (${playlist.tracks.length} songs)!`);
};
const emotes = require ('../configs/emotes.json')

module.exports = (client, message, queue, track) => {
    message.channel.send(`${emotes.music} - ${track.title} has been added to the queue !`);
};
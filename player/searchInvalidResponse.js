const emotes = require ('../configs/emotes.json')

module.exports = (client, message, query, tracks, content, collector) => {
    if (content === 'cancel') {
        collector.stop();
        return message.channel.send(`${emotes.music} - The search has been cancelled!`);
    } else message.channel.send(`${emotes.music} - You must send a valid number between 1 and ${tracks.length}!`);
};
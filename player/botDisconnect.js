const emotes = require ('../configs/emotes.json')

module.exports = (client, message, queue) => {
    message.channel.send(`${emotes.music} - Music has stopped as i was disconnected from the voice channel!`);
};
const emotes = require ('../configs/emotes.json')

module.exports = (client, message, queue) => {
    message.channel.send(`${emotes.music} - Music stopped as there isn\'t anything left in the queue, use m!play to add another song!`);
};
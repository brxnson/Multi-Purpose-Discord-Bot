const emotes = require ('../configs/emotes.json')

module.exports = (client, message, query) => {
    message.channel.send(`:warning: - No matches found, try using a more known name or a youtube/spotify link!`);
};
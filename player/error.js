const emotes = require ('../configs/emotes.json')

module.exports = (client, error, message) => {
    switch (error) {
        case 'NotPlaying':
            message.channel.send(`:warning: - There is no music being played into this server!`);
            break;
        case 'NotConnected':
            message.channel.send(`:warning: - You are not currently in any voice channel!`);
            break;
        case 'UnableToJoin':
            message.channel.send(`:warning: - I am not able to join your voice channel, please check my permissions!`);
            break;
        default:
            message.channel.send(`:warning: - Something went wrong. Error : ${error}`);
    };
};

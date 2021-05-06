const mongoose = require ('mongoose')

const ChannelSchema = new mongoose.Schema({
    GuildName: String,
    GuildID: String,
    ChannelID: String
})

module.exports = mongoose.model('Bot-React-Channels', ChannelSchema)
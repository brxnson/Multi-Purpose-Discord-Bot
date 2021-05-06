const mongoose = require ('mongoose')

const DeleteSchema = new mongoose.Schema({
    GuildName: String,
    GuildID: String,
    ChannelID: String
})

module.exports = mongoose.model('Bot-Delete-Log-Channels', DeleteSchema)
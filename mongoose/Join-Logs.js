const mongoose = require ('mongoose')

const JoinSchema = new mongoose.Schema({
    GuildName: String,
    GuildID: String,
    ChannelID: String
})

module.exports = mongoose.model ('Bot-Join-Logs', JoinSchema)
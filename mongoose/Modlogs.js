const mongoose = require ('mongoose')

const Schema = new mongoose.Schema({
    GuildName: String,
    GuildID: String,
    ChannelID: String
})

module.exports = mongoose.model ('Bot-Mod-Logs-Channels', Schema)
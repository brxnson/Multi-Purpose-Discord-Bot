const mongoose = require ('mongoose')

const PrefixSchema = new mongoose.Schema({
    GuildName: String,
    GuildID: String,
    Prefix: String
})

module.exports = mongoose.model('Bot-Prefixes', PrefixSchema)
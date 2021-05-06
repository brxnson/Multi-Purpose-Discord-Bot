const mongoose = require ('mongoose')

const AutoSchema = new mongoose.Schema({
    GuildName: String,
    GuildID: String,
    RoleID: String
})

module.exports = mongoose.model('Bot-AutoRoles', AutoSchema)
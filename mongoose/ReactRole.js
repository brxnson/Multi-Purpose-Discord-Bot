const mongoose = require ('mongoose')

const RoleSchema = new mongoose.Schema({
    GuildName: String,
    GuildID: String,
    MessageID: String,
    RoleID: String,
    ReactID: String,
    ReactName: String
})

module.exports = mongoose.model('Bot-React-Roles', RoleSchema)
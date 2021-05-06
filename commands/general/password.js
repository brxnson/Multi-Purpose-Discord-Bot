const Discord = require ('discord.js')
const axios = require ('axios')
const { PasswordKey } = require ('../../configs/Api-Keys.json')
module.exports.config = {
    name: "password",
    aliases: [],
    category: "general",
    dmOnly: false, // Boolean
    guildOnly: false, // Boolean
    args: false, // Boolean
    usage: '',
    cooldown: 5, //seconds(s)
    guarded: false, // Boolean
    permissions: ["SEND_MESSAGES"],
}

module.exports.run = async (client, message, args) => {

axios({
    method: "get",
    url: "https://api.happi.dev/v1/generate-password?length=15&num=1&upper=1&symbols=1",
    headers: {"x-happi-key": PasswordKey}
}).then(async res => {

const msg = await message.channel.send('I have dmed you with your generated password!')

const embed = new Discord.MessageEmbed()
.setTitle('Here is your password!')
.setDescription(`**${res.data.passwords[0]}**`)
.setColor('#36393f')

message.author.send(embed).catch(err => {return message.channel.send('I was unable to dm you. Please make sure you turn dms on!'), msg.delete()})

})

}
const Discord = require ('discord.js')
const emotes = require ('../../configs/emotes.json')
module.exports.config = {
    name: "queue",
    aliases: [],
    category: "music",
    dmOnly: false, // Boolean
    guildOnly: true, // Boolean
    args: true, // Boolean
    usage: '<Display Number>',
    cooldown: 5, //seconds(s)
    guarded: false, // Boolean
    permissions: ["SEND_MESSAGES"],
}

module.exports.run = async (client, message, args) => {

    if (!message.member.voice.channel) return message.channel.send(`:warning: - You are not in a voice channel!`);

    if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`:warning: - You are not in the same voice channel as the bobt!`);

    const queue = client.player.getQueue(message);

    if (!client.player.getQueue(message)) return message.channel.send(`:warning: - Cannot find a queue!`);

if(!args[0]) {
    return message.channel.send('You must give a number or songs to display!')
}

    if (args[0] > 10 || args[0] < 1)  {

       return message.channel.send('You must give a number between 1 and 10.')
    
    }

   const embed = new Discord.MessageEmbed()

   .setTitle(`${emotes.music} - ${message.guild.name} Server Queue:`)
   .setColor('#36393f')
   .setFooter(`Made with <3`, `https://cdn.discordapp.com/avatars/810650843614412830/23b88265170214712880d5aa6d6ec743.png?size=1024`)
   .setTimestamp()
   .addFields(
       {name: 'Current Song:', value: `${queue.playing.title} | ${queue.playing.author}`},
       {name: 'Queued Songs:', value: (queue.tracks.map((track, i) => { return `**#${i + 1}** - ${track.title} | ${track.author} (requested by : ${track.requestedBy.username})` }).slice(0, args[0]).join('\n') + `\n\n${queue.tracks.length > args[0]  ? `**And ${queue.tracks.length - args[0]} other songs**` : `**There are ${queue.tracks.length} songs in the queue**`}`)}
   )

   message.channel.send(embed).catch(err => message.channel.send(':warning: - I do not have the correct permissions required for this command, please grant me the \`Embed Links\` permission!'))

   

}


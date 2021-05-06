const emotes = require ('../configs/emotes.json')

const Discord = require ('discord.js')
module.exports = (client, message, query, tracks) => {
    message.channel.send({
        embed: {
            color: message.guild.me.displayColor,
            author: { name: `Here are your search results for - ${query}` },
            footer: { text: 'Made With <3' },
            timestamp: new Date(),
            description: `${tracks.map((t, i) => `**${i + 1}** - ${t.title}`).join('\n')}\n\nTo play one of these songs respond with the corresponding number.\nTo cancel this search respond with \`cancel\`.`,
        },
    }).catch(err => message.channel.send(':warning: - I do not have the correct permissions required for this command, please grant me the \`Embed Links\` permission!'))
};
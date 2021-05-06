const Discord = require ('discord.js')
module.exports.config = {
    name: "eval",
    aliases: [],
    dmOnly: false, // Boolean
    guildOnly: false, // Boolean
    args: true, // Boolean
    usage: '<Eval Code>',
    cooldown: 5, //seconds(s)
    guarded: true, // Boolean
}

module.exports.run = async (client, message, args) => {


    const config = require ('../../configs/config.json')

    if(message.member.id !== config.DevID) return 
    
    const input = args.join(" ")
    
    if (!args[0]) {
        return message.reply('You must state code to eval!')
    }
    
    if(input === 'process.exit') {
        return message.channel.send('You cannot run that!')
    }
    
    if(input === 'client.token' || input === 'config.token') {
        return message.channel.send('I am unable to send the bot token!')
    }
    
    try {
    
        if(message.guild.me.hasPermission("EMBED_LINKS") || message.channel.permissionsFor('810650843614412830').has("EMBED_LINKS")) {
    
        const result = await eval(input);
    
    const embed = new Discord.MessageEmbed()
    
    .setTitle('Eval Information')
    .setColor('#36393f')
    .setTimestamp()
    .addFields(
        {name: 'Eval Input:', value: `\`\`\`js\n${args.join(" ")}\`\`\``},
        {name: 'Eval Output:', value: `\`\`\`js\n${result}\`\`\``},
    )
    
    message.channel.send(embed)
    
    
        } else {
    
            const result = await eval(input);
    
    
        }
    
    } catch (error) {
    
        if(message.guild.me.hasPermission("EMBED_LINKS") || message.channel.permissionsFor('810650843614412830').has("EMBED_LINKS")) {
    
        const embed = new Discord.MessageEmbed()
    
        .setTitle('Command Error')
        .setColor('#36393f')
        .setDescription(`\`\`\`${error}\`\`\``)
        .setFooter(`Made with <3`)
        .setTimestamp()
    
        message.channel.send(embed)
    
    
    } else {
    
    message.channel.send(`\`\`\`js\n${error}\`\`\``)
    
    }
    
    }
    

}
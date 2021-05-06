const Discord = require ('discord.js')
const covid = require ('covidtracker')
module.exports.config = {
    name: "covid",
    aliases: [],
    category: "information",
    dmOnly: false, // Boolean
    guildOnly: false, // Boolean
    args: false, // Boolean
    usage: '',
    cooldown: 5, //seconds(s)
    guarded: false, // Boolean
    permissions: ["SEND_MESSAGE"],
}

module.exports.run = async (client, message, args) => {

    if (!args[0]) {
        const totalStats = await covid.getAll();

        const updatedTime = new Date(totalStats.updated);

        const embed = new Discord.MessageEmbed()
            .setAuthor(`Corona Stats`)
            .addField(`Total Cases:`, `**${totalStats.cases.toLocaleString()}**`, true)
            .addField(`Today's Cases:`, `+${totalStats.todayCases.toLocaleString()}`, true)
            .addField(`Today's Deaths:`, `+${totalStats.todayDeaths.toLocaleString()}`, true)
            .addField(`Active Cases:`, `${totalStats.active.toLocaleString()} (${((totalStats.active / totalStats.cases) * 100).toFixed(2)}%)`, true)
            .addField(`Recovered:`, `${totalStats.recovered.toLocaleString()} (${((totalStats.recovered / totalStats.cases) * 100).toFixed(2)}%)`, true)
            .addField(`Deaths:`, `${totalStats.deaths.toLocaleString()} (${((totalStats.deaths / totalStats.cases) * 100).toFixed(2)}%)`, true)
            .addField(`Tests`, `${totalStats.tests.toLocaleString()}`, true)
            .addField(`Cases Per One Milion:`, `${totalStats.casesPerOneMillion.toLocaleString()}`, true)
            .addField(`Deaths Per One Milion:`, `${totalStats.deathsPerOneMillion.toLocaleString()}`, true)
            .setColor('#36393f')
            .setFooter(`Last Update: ${updatedTime}`);
        return message.channel.send(embed);
    } else if (args[0]) {
        const stats = await covid.getCountry({ country: args[0] })

        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const updatedTime = new Date(stats.updated)
        const update = updatedTime.toLocaleDateString("en-US", options)

        const embed = new Discord.MessageEmbed()
            .setAuthor(`Corona Stats for ${args[0]}`)
            .addField(`Total Cases:`, `**${stats.cases.toLocaleString()}**`, true)
            .addField(`Today's Cases:`, `+${stats.todayCases.toLocaleString()}`, true)
            .addField(`Today's Deaths:`, `+${stats.todayDeaths.toLocaleString()}`, true)
            .addField(`Active Cases:`, `${stats.active.toLocaleString()} (${((stats.active / stats.cases) * 100).toFixed(2)}%)`, true)
            .addField(`Recovered:`, `${stats.recovered.toLocaleString()} (${((stats.recovered / stats.cases) * 100).toFixed(2)}%)`, true)
            .addField(`Deaths:`, `${stats.deaths.toLocaleString()} (${((stats.deaths / stats.cases) * 100).toFixed(2)}%)`, true)
            .addField(`Tests:`, `${stats.tests.toLocaleString()}`, true)
            .addField(`Cases Per One Milion:`, `${stats.casesPerOneMillion.toLocaleString()}`, true)
            .setColor('#36393f')
            .setFooter(`Last Update: ${update}`)
        return message.channel.send(embed)
    }

}
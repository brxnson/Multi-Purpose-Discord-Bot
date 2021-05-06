const Discord = require ('discord.js')
module.exports.config = {
    name: "purge",
    aliases: [],
    description: 'This command will allow you to bulk delete the specified amount of messages from the message channel',
    category: "moderation",
    dmOnly: false, // Boolean
    guildOnly: true, // Boolean
    args: true, // Boolean
    usage: '<Amount To Purge>',
    cooldown: 5, //seconds(s)
    guarded: false, // Boolean
    permissions: ["ADMINISTRATOR"],
}

module.exports.run = async (client, message, args) => {

if (!message.guild.me.permissions.has("MANAGE_MESSAGES")) return message.channel.send('Please make sure i have the \`Manage Messages\` permission to use this command!')

// defining the amount of messages to be purged as a argument so the user can input the amount
const amount = parseInt(args[0]) + 1;

// checking if we have the correct arguments and if we don't then it returns
    if (isNaN(amount)) {
        return message.reply('that doesn\'t seem to be a valid number.').then(m => m.delete({timeout: 5000}));
    } else if (amount <= 1 || amount > 99) {
        return message.reply('you need to input a number between 1 and 99.').then(m => m.delete({timeout: 5000}));
    }

    // deleting the amount of messages that the user inputted
    message.channel.bulkDelete(amount, true)

    // replying saying that the message have been purged then deleting that message after 5 seconds
    message.reply('The messages have been purged!').then(m => m.delete({timeout: 5000})).catch(err => {

        // if any errors are caught then it will log in the console and reply with there was an error
        console.error(err);
        message.channel.send('there was an error trying to prune messages in this channel!').then(m => m.delete({timeout: 5000}));
    });


}
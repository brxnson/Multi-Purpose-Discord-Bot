/*
██╗███╗░░░███╗██████╗░░█████╗░██████╗░████████╗██╗███╗░░██╗░██████╗░
██║████╗░████║██╔══██╗██╔══██╗██╔══██╗╚══██╔══╝██║████╗░██║██╔════╝░
██║██╔████╔██║██████╔╝██║░░██║██████╔╝░░░██║░░░██║██╔██╗██║██║░░██╗░
██║██║╚██╔╝██║██╔═══╝░██║░░██║██╔══██╗░░░██║░░░██║██║╚████║██║░░╚██╗
██║██║░╚═╝░██║██║░░░░░╚█████╔╝██║░░██║░░░██║░░░██║██║░╚███║╚██████╔╝
╚═╝╚═╝░░░░░╚═╝╚═╝░░░░░░╚════╝░╚═╝░░╚═╝░░░╚═╝░░░╚═╝╚═╝░░╚══╝░╚═════╝░

███╗░░░███╗░█████╗░██████╗░██╗░░░██╗██╗░░░░░███████╗░██████╗
████╗░████║██╔══██╗██╔══██╗██║░░░██║██║░░░░░██╔════╝██╔════╝
██╔████╔██║██║░░██║██║░░██║██║░░░██║██║░░░░░█████╗░░╚█████╗░
██║╚██╔╝██║██║░░██║██║░░██║██║░░░██║██║░░░░░██╔══╝░░░╚═══██╗
██║░╚═╝░██║╚█████╔╝██████╔╝╚██████╔╝███████╗███████╗██████╔╝
╚═╝░░░░░╚═╝░╚════╝░╚═════╝░░╚═════╝░╚══════╝╚══════╝╚═════╝░
*/

const Discord = require ('discord.js')
const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });
const fs = require ('fs')
const mongoose = require ('mongoose')
let ascii = require ('ascii-table')
const { Player } = require ('discord-player')
client.player = new Player(client)
const schema = require ('./mongoose/prefix')
const MessageDelete = require ('./events/MessageDelete')
const guildMemberAdd = require ('./events/GuildMemberAdd')
const guildMemberRemove = require ('./events/GuildMemberRemove')
const messageReactionAdd = require ('./events/ReactionAdd')
const ModLogs = require ('./events/Server-Logs')
const config = require ('./configs/config.json')

/*

██████╗░███████╗░█████╗░██████╗░██╗░░░██╗  ███████╗██╗░░░██╗███████╗███╗░░██╗████████╗
██╔══██╗██╔════╝██╔══██╗██╔══██╗╚██╗░██╔╝  ██╔════╝██║░░░██║██╔════╝████╗░██║╚══██╔══╝
██████╔╝█████╗░░███████║██║░░██║░╚████╔╝░  █████╗░░╚██╗░██╔╝█████╗░░██╔██╗██║░░░██║░░░
██╔══██╗██╔══╝░░██╔══██║██║░░██║░░╚██╔╝░░  ██╔══╝░░░╚████╔╝░██╔══╝░░██║╚████║░░░██║░░░
██║░░██║███████╗██║░░██║██████╔╝░░░██║░░░  ███████╗░░╚██╔╝░░███████╗██║░╚███║░░░██║░░░
╚═╝░░╚═╝╚══════╝╚═╝░░╚═╝╚═════╝░░░░╚═╝░░░  ╚══════╝░░░╚═╝░░░╚══════╝╚═╝░░╚══╝░░░╚═╝░░░
*/

client.on("ready", () => {

    console.log(`Logged in as ${client.user.tag}. Bot Invite: https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot`)

    MessageDelete(client)
    guildMemberAdd(client)
    guildMemberRemove(client)
    ModLogs(client)
    messageReactionAdd(client)
})

/*

░█████╗░░█████╗░███╗░░██╗███╗░░██╗███████╗░█████╗░████████╗██╗░█████╗░███╗░░██╗░██████╗
██╔══██╗██╔══██╗████╗░██║████╗░██║██╔════╝██╔══██╗╚══██╔══╝██║██╔══██╗████╗░██║██╔════╝
██║░░╚═╝██║░░██║██╔██╗██║██╔██╗██║█████╗░░██║░░╚═╝░░░██║░░░██║██║░░██║██╔██╗██║╚█████╗░
██║░░██╗██║░░██║██║╚████║██║╚████║██╔══╝░░██║░░██╗░░░██║░░░██║██║░░██║██║╚████║░╚═══██╗
╚█████╔╝╚█████╔╝██║░╚███║██║░╚███║███████╗╚█████╔╝░░░██║░░░██║╚█████╔╝██║░╚███║██████╔╝
░╚════╝░░╚════╝░╚═╝░░╚══╝╚═╝░░╚══╝╚══════╝░╚════╝░░░░╚═╝░░░╚═╝░╚════╝░╚═╝░░╚══╝╚═════╝░
*/

client.login(config.token)
mongoose.connect('mongodb+srv://Brxnson:J0j0b3thy@cluster0.sidg5.mongodb.net/test?authSource=admin&replicaSet=atlas-gl9iyk-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

/*

███████╗██╗██╗░░░░░███████╗  ██╗░░██╗░█████╗░███╗░░██╗██████╗░██╗░░░░░███████╗██████╗░░██████╗
██╔════╝██║██║░░░░░██╔════╝  ██║░░██║██╔══██╗████╗░██║██╔══██╗██║░░░░░██╔════╝██╔══██╗██╔════╝
█████╗░░██║██║░░░░░█████╗░░  ███████║███████║██╔██╗██║██║░░██║██║░░░░░█████╗░░██████╔╝╚█████╗░
██╔══╝░░██║██║░░░░░██╔══╝░░  ██╔══██║██╔══██║██║╚████║██║░░██║██║░░░░░██╔══╝░░██╔══██╗░╚═══██╗
██║░░░░░██║███████╗███████╗  ██║░░██║██║░░██║██║░╚███║██████╔╝███████╗███████╗██║░░██║██████╔╝
╚═╝░░░░░╚═╝╚══════╝╚══════╝  ╚═╝░░╚═╝╚═╝░░╚═╝╚═╝░░╚══╝╚═════╝░╚══════╝╚══════╝╚═╝░░╚═╝╚═════╝░
*/

const player = fs.readdirSync('./player').filter(file => file.endsWith('.js'));

for (const file of player) {
    const event = require(`./player/${file}`);
    client.player.on(file.split(".")[0], event.bind(null, client));
};


//Command Handler
client.commands = new Discord.Collection(); // Defining the client commands for the commands folder
client.aliases = new Discord.Collection(); // Defining the client aliases for the commands folder
cooldowns = new Discord.Collection()

let table = new ascii("Bot Commands") // Defining a new table with the title "Bot Commands"
table.setHeading("Command", "Load Status") // Adding headers to the table for the bot commands

fs.readdirSync("./commands/").forEach(dir => { // Reading all files in the commands folder
    const commands = fs.readdirSync(`./commands/${dir}/`).filter(file => file.endsWith(".js")); // Defining commands and filtering the files to only get the names 
    for (let file of commands) {  // looping through the files
        let pull = require(`./commands/${dir}/${file}`); 
        if (pull.config.name) { 
            client.commands.set(pull.config.name, pull); // setting the client commands as the command name 
            table.addRow(file, 'Ready!');  // adding a row to the table to say the file name and the load status
        } else {
            table.addRow(file, `error -> missing a help.name, or help.name is not a string.`); // Adding another row to the table stating the name of the file and the error
            return; 
        }
        pull.config.aliases.forEach(alias => { 
            client.aliases.set(alias, pull.config.name) // setting the command aliases as the command aliases
          })
        }
})
console.log(table.toString()); //showing the table

/*

███╗░░░███╗███████╗░██████╗░██████╗░█████╗░░██████╗░███████╗  ███████╗██╗░░░██╗███████╗███╗░░██╗████████╗
████╗░████║██╔════╝██╔════╝██╔════╝██╔══██╗██╔════╝░██╔════╝  ██╔════╝██║░░░██║██╔════╝████╗░██║╚══██╔══╝
██╔████╔██║█████╗░░╚█████╗░╚█████╗░███████║██║░░██╗░█████╗░░  █████╗░░╚██╗░██╔╝█████╗░░██╔██╗██║░░░██║░░░
██║╚██╔╝██║██╔══╝░░░╚═══██╗░╚═══██╗██╔══██║██║░░╚██╗██╔══╝░░  ██╔══╝░░░╚████╔╝░██╔══╝░░██║╚████║░░░██║░░░
██║░╚═╝░██║███████╗██████╔╝██████╔╝██║░░██║╚██████╔╝███████╗  ███████╗░░╚██╔╝░░███████╗██║░╚███║░░░██║░░░
╚═╝░░░░░╚═╝╚══════╝╚═════╝░╚═════╝░╚═╝░░╚═╝░╚═════╝░╚══════╝  ╚══════╝░░░╚═╝░░░╚══════╝╚═╝░░╚══╝░░░╚═╝░░░

███╗░░██╗░█████╗░  ░██████╗███████╗████████╗  ██████╗░██████╗░███████╗███████╗██╗██╗░░██╗
████╗░██║██╔══██╗  ██╔════╝██╔════╝╚══██╔══╝  ██╔══██╗██╔══██╗██╔════╝██╔════╝██║╚██╗██╔╝
██╔██╗██║██║░░██║  ╚█████╗░█████╗░░░░░██║░░░  ██████╔╝██████╔╝█████╗░░█████╗░░██║░╚███╔╝░
██║╚████║██║░░██║  ░╚═══██╗██╔══╝░░░░░██║░░░  ██╔═══╝░██╔══██╗██╔══╝░░██╔══╝░░██║░██╔██╗░
██║░╚███║╚█████╔╝  ██████╔╝███████╗░░░██║░░░  ██║░░░░░██║░░██║███████╗██║░░░░░██║██╔╝╚██╗
╚═╝░░╚══╝░╚════╝░  ╚═════╝░╚══════╝░░░╚═╝░░░  ╚═╝░░░░░╚═╝░░╚═╝╚══════╝╚═╝░░░░░╚═╝╚═╝░░╚═╝
*/

client.on("message", async message => {

    if (message.author.bot) return

    const data = await schema.findOne({
        GuildID: message.guild.id
    })

    if (!data) {

    if(message.author.bot || !message.content.startsWith(config.prefix)) return;
    const args = message.content.slice(config.prefix.length).split(/ +/g);
    if (!args.length) return message.channel.send(`You didn't pass any command to reload, ${message.author}!`);
    const commandName = args.shift().toLowerCase();

    const cmd = client.commands.get(commandName)

    || client.commands.find(cmd => cmd.config.aliases && cmd.config.aliases.includes(commandName));

    if (!cmd) return

        try{

            //+ cooldown 1, //seconds(s)
            if (!cooldowns.has(cmd.config.name)) {
                cooldowns.set(cmd.config.name, new Discord.Collection());
            }
            
            const now = Date.now();
            const timestamps = cooldowns.get(cmd.config.name);
            const cooldownAmount = (cmd.config.cooldown || 3) * 1000;
            
            if (timestamps.has(message.author.id)) {
                const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
            
                if (now < expirationTime) {
                    const timeLeft = (expirationTime - now) / 1000;
                    return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${cmd.config.name}\` command.`);
                }
            }
            timestamps.set(message.author.id, now);
            setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

        //+ args: true/false,
        if (cmd.config.args && !args.length) {
            		let reply = `You didn't provide any arguments, ${message.author}!`;

                    //+ usage: '<> <>',
            		if (cmd.config.usage) {
            			reply += `\nThe proper usage would be: \`${config.prefix}${cmd.config.name} ${cmd.config.usage}\``;
            		}
            
            		return message.channel.send(reply);
                }
                 
                 //+ permissions: [""],
                 if (cmd.config.permissions) {
                     	const authorPerms = message.channel.permissionsFor(message.author);
                     	if (!authorPerms || !authorPerms.has(cmd.config.permissions)) {
                     		return message.reply('You can not do this!');
                    	}
                     }

                //+ guildOnly: true/false,
                if (cmd.config.guildOnly && message.channel.type === 'dm') {
                    return message.reply('I can\'t execute that command inside DMs!');
                }

                //+ dmOnly: true/false,
                if (cmd.config.dmOnly && message.channel.type === 'text') {
                    return message.reply('I can\'t execute that command inside the server!');
                }

                if(cmd.config.guarded && message.author.id !== '575330298968014859') {
                    return message.reply('You can not do this!')
                }

        cmd.run(client, message, args);
    }catch(err){
        message.reply(`there was an error in the console.`);
        console.log(err);
    }

/*

███╗░░░███╗███████╗░██████╗░██████╗░█████╗░░██████╗░███████╗  ███████╗██╗░░░██╗███████╗███╗░░██╗████████╗
████╗░████║██╔════╝██╔════╝██╔════╝██╔══██╗██╔════╝░██╔════╝  ██╔════╝██║░░░██║██╔════╝████╗░██║╚══██╔══╝
██╔████╔██║█████╗░░╚█████╗░╚█████╗░███████║██║░░██╗░█████╗░░  █████╗░░╚██╗░██╔╝█████╗░░██╔██╗██║░░░██║░░░
██║╚██╔╝██║██╔══╝░░░╚═══██╗░╚═══██╗██╔══██║██║░░╚██╗██╔══╝░░  ██╔══╝░░░╚████╔╝░██╔══╝░░██║╚████║░░░██║░░░
██║░╚═╝░██║███████╗██████╔╝██████╔╝██║░░██║╚██████╔╝███████╗  ███████╗░░╚██╔╝░░███████╗██║░╚███║░░░██║░░░
╚═╝░░░░░╚═╝╚══════╝╚═════╝░╚═════╝░╚═╝░░╚═╝░╚═════╝░╚══════╝  ╚══════╝░░░╚═╝░░░╚══════╝╚═╝░░╚══╝░░░╚═╝░░░

░  ░██████╗███████╗████████╗  ██████╗░██████╗░███████╗███████╗██╗██╗░░██╗
╗ ██╔════╝██╔════╝╚══██╔══╝  ██╔══██╗██╔══██╗██╔════╝██╔════╝██║╚██╗██╔╝
  ╚█████╗░█████╗░░░░░██║░░░  ██████╔╝██████╔╝█████╗░░█████╗░░██║░╚███╔╝░
  ░╚═══██╗██╔══╝░░░░░██║░░░  ██╔═══╝░██╔══██╗██╔══╝░░██╔══╝░░██║░██╔██╗░
  ██████╔╝███████╗░░░██║░░░  ██║░░░░░██║░░██║███████╗██║░░░░░██║██╔╝╚██╗
  ╚═════╝░╚══════╝░░░╚═╝░░░  ╚═╝░░░░░╚═╝░░╚═╝╚══════╝╚═╝░░░░░╚═╝╚═╝░░╚═╝
*/



 } else if (data) {

    const prefix = data.Prefix

    if(message.author.bot || !message.content.startsWith(prefix)) return;
    const args = message.content.slice(prefix.length).split(/ +/g);
    if (!args.length) return message.channel.send(`You didn't pass any command to reload, ${message.author}!`);
    const commandName = args.shift().toLowerCase();

    const cmd = client.commands.get(commandName)
        //+ aliases: [""],
        || client.commands.find(cmd => cmd.config.aliases && cmd.config.aliases.includes(commandName));

        if (!cmd) return 
        try{

            //+ cooldown 1, //seconds(s)
            if (!cooldowns.has(cmd.config.name)) {
                cooldowns.set(cmd.config.name, new Discord.Collection());
            }
            
            const now = Date.now();
            const timestamps = cooldowns.get(cmd.config.name);
            const cooldownAmount = (cmd.config.cooldown || 3) * 1000;
            
            if (timestamps.has(message.author.id)) {
                const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
            
                if (now < expirationTime) {
                    const timeLeft = (expirationTime - now) / 1000;
                    return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${cmd.config.name}\` command.`);
                }
            }
            timestamps.set(message.author.id, now);
            setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

        //+ args: true/false,
        if (cmd.config.args && !args.length) {
            		let reply = `You didn't provide any arguments, ${message.author}!`;

                    //+ usage: '<> <>',
            		if (cmd.config.usage) {
            			reply += `\nThe proper usage would be: \`${prefix}${cmd.config.name} ${cmd.config.usage}\``;
            		}
            
            		return message.channel.send(reply);
                }
                 
                 //+ permissions: [""],
                 if (cmd.config.permissions) {
                     	const authorPerms = message.channel.permissionsFor(message.author);
                     	if (!authorPerms || !authorPerms.has(cmd.config.permissions)) {
                     		return message.reply('You can not do this!');
                    	}
                     }

                //+ guildOnly: true/false,
                if (cmd.config.guildOnly && message.channel.type === 'dm') {
                    return message.reply('I can\'t execute that command inside DMs!');
                }

                //+ dmOnly: true/false,
                if (cmd.config.dmOnly && message.channel.type === 'text') {
                    return message.reply('I can\'t execute that command inside the server!');
                }

                if(cmd.config.guarded && message.author.id !== '575330298968014859') {
                    return message.reply('You can not do this!')
                }


        cmd.run(client, message, args);
    }catch(err){
        message.reply(`there was an error in the console.`);
        console.log(err);
    }

}

})
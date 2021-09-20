// require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client({partials: ["MESSAGE", "CHANNEL", "REACTION"]});
const keepAlive = require("./server");
const fs = require('fs');


const prefix = '$';
const errorChannel = "870340234540363807";	// for testing purposes

// set up the command reader
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));

for(const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

// connect bot
client.once('ready', () => {
	console.log('Moody is online.');
})

//whenever a message is sent
client.on('messageCreate', message => {

	//if starts with the proper prefix and or written by bot (do nothing)
	if (!message.content.startsWith(prefix) || message.author.bot) {
		return;
	}
	//gets the command that comes after the prefix
	const args = message.content.slice(prefix.length).split(/ +/);
	const command = args.shift().toLowerCase();

	//send a list of the commands (embedded)
	if (command === 'ping') {
		message.reply('pong!');
	}
	else if (command === 'commands') {
		try {
			client.commands.get('commands').execute(message,Discord);
		}catch (error) {
			client.channels.cache.get(errorChannel).send(`<@!473214825833431051> there was an error when calling !${command}: ${error.message}`);
		};
		
	}
});

keepAlive();

// client.login(process.env.BOT_TOKEN);
client.login(process.env['BOT_TOKEN'])
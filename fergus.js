const DISCORD = require('discord.js');
const CLIENT = new DISCORD.Client();

// make json objects
const BREAD = require('./json/bread.json');
const GODDESSES = require('./json/goddesses.json');
const HEROES = require('./json/heroes.json');
//const SBWS = require('./json/sbws.json');
//const SKILLS = require('./json/skills.json');
const SKINS = require('./json/skins.json');
//const WEAPONS = require('./json/weapons.json');

// get command functions
let etc = require('./scripts/etc.js');
let bread = require('./scripts/bread.js');
let goddess = require('./scripts/goddesses.js');
let hero = require('./scripts/heroes.js');
//let sbw = require('./scripts/sbws.js');
let skill = require('./scripts/skills.js');
let skin = require('./scripts/skins.js');
//const weapon = require('./scripts/weapons.js');

// asynchronous event handler
CLIENT.on('ready', () => {
  console.log(`${CLIENT.user.username}#${CLIENT.user.discriminator}` +
		' is online.');
});

// message event handler
CLIENT.on('message', message => {
  let prefix = "!";
  if(!message.content.startsWith(prefix) || message.author.bot) {
		return;
	}

	let msg = message.content.toLowerCase(); // case-insensitive

	// command list
	if(msg.startsWith(prefix + 'help')) {
		message.channel.sendMessage(etc.getHelp());
	}
	else if(msg.startsWith(prefix + 'about')) {
			message.channel.sendMessage(etc.getAbout());
	}
	else if(msg.startsWith(prefix + 'bread')) {
		message.channel.sendMessage(bread.getBread(msg.split(' '),
			BREAD));
	}
	else if(msg.startsWith(prefix + 'goddess')) {
		message.channel.sendMessage(goddess.getGoddess(msg.split(' '),
			GODDESSES));
	}
	else if(msg.startsWith(prefix + 'hero')) {
		message.channel.sendMessage(hero.getHero(msg.split(' '),
			HEROES));
	}
	//else if(msg.startsWith(prefix + 'sbw')) {}
	//else if(msg.startsWith(prefix + 'skill')) {}
	else if(msg.startsWith(prefix + 'skin')) {
		message.channel.sendMessage(skin.getSkin(msg.split(' '),
			SKINS));
	}
	//else if(msg.startsWith(prefix + 'weapon')) {}
	else if(msg.startsWith(prefix + 'lenny')) {
		message.channel.sendMessage('( ͡° ͜ʖ ͡°)');
	}
	else if(msg.startsWith(prefix + 'fergus')) {
		message.channel.sendFile(CLIENT.user.avatarURL,
			'', `${message.author}, No.`); //message.reply('No.');
	}
});

CLIENT.login(require('./token.json').token);

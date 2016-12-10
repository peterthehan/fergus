const DISCORD = require('discord.js');
const CLIENT = new DISCORD.Client();
const T = require('./token.json');

const BREAD_JSON = require('./json/bread.json');
const GODDESSES_JSON = require('./json/goddesses.json');
const HEROES_JSON = require('./json/heroes.json');
//const SBWS_JSON = require('./json/sbws.json');
//const SKILLS_JSON = require('./json/skills.json');
const SKINS_JSON = require('./json/skins.json');
//const WEAPONS_JSON = require('./json/weapons.json');

const BREAD_JS = require('./scripts/bread.js');
const GODDESSES_JS = require('./scripts/goddesses.js');
const HEROES_JS = require('./scripts/heroes.js');
//const SBWS_JS = require('./scripts/sbws.js');
const SKILLS_JS = require('./scripts/skills.js');
const SKINS_JS = require('./scripts/skins.js');
//const WEAPONS_JS = require('./scripts/weapons.js');

// asynchronous event handler
CLIENT.on('ready', () => {
  console.log(`${CLIENT.user.username}#${CLIENT.user.discriminator} is online.`);
});

// message event handler
CLIENT.on('message', message => {
  let prefix = "!";
  if(!message.content.startsWith(prefix) || message.author.bot) {
		return;
	}

	// case-insensitive
	let msg = message.content.toLowerCase();

	// command list
	if(msg.startsWith(prefix + 'help')) {
		message.channel.sendMessage();
	}
	else if(msg.startsWith(prefix + 'hero')) {
		// !hero: help
		// !hero heroName: all hero information for 6 star
		// !hero heroName star#: all hero information for # star
		// !hero heroName info|stats|skill: hero information for 6 star
		// !hero heroName (info|stats|skill star#): hero information for # star
		message.channel.sendMessage(HEROES_JS.getHero(msg.split(' '), HEROES_JSON));
	}
	else if(msg.startsWith(prefix + 'bread')) {
		// !bread: help
		// !bread breadName: bread information
		message.channel.sendMessage(BREAD_JS.getBread(msg.split(' '), BREAD_JSON));
	}
	else if(msg.startsWith(prefix + 'goddess')) {
		// !goddess: help
		// !goddess: goddessName: goddess information
		message.channel.sendMessage(GODDESSES_JS.getGoddess(msg.split(' '), GODDESSES_JSON));
	}
	else if(msg.startsWith(prefix + 'skin')) {
		// !skin: help
		// !skin: heroName: skin information
		message.channel.sendMessage(SKINS_JS.getSkin(msg.split(' '), SKINS_JSON));
	}
	else if(msg.startsWith(prefix + 'test')) {
		message.channel.sendMessage(test.test(BREAD_JSON));
	}
	else if(msg.startsWith(prefix + 'lenny')) {
		message.channel.sendMessage('( ͡° ͜ʖ ͡°)');
	}
	else if(msg.startsWith(prefix + 'fergus')) {
		//message.reply('No.');
		message.channel.sendFile(CLIENT.user.avatarURL, '', `${message.author}, No.`);
	}
});

CLIENT.login(T.token);

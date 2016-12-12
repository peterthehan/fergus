const DISCORD = require('discord.js');
const CLIENT = new DISCORD.Client();

// contains token, prefix, welcomePre, welcomePost, farewellPre, farewellPost
// look at configEXAMPLE.json for formatting
const CONFIG = require('./config.json');
const PREFIX = CONFIG.prefix;

// get json objects
const BREAD = require('./cqdb/bread.json');
const GODDESSES = require('./cqdb/goddesses.json');
const HEROES = require('./cqdb/heroes.json');
//const SBWS = require('./cqdb/sbws.json');
//const SKILLS = require('./cqdb/skills.json');
const SKINS = require('./cqdb/skins.json');
//const WEAPONS = require('./cqdb/weapons.json');

// get command functions
let etc = require('./scripts/etc.js'); // !help, !about
let bread = require('./scripts/bread.js');
let goddess = require('./scripts/goddesses.js');
let hero = require('./scripts/heroes.js');
//let sbw = require('./scripts/sbws.js');
//let skill = require('./scripts/skills.js');
let skin = require('./scripts/skins.js');
//let weapon = require('./scripts/weapons.js');

// asynchronous event handler, required for bot to read Discord messages
CLIENT.on('ready', () => {
  console.log(`${CLIENT.user.username}#${CLIENT.user.discriminator}` +
		' is online.');
});

// welcome event handler
CLIENT.on('guildMemberAdd', (member) => {
	const GUILD = member.guild;
	GUILD.channels.get(GUILD.id).sendMessage(
		CONFIG.welcomePre + member + CONFIG.welcomePost
	);
});

// farewell event handler
CLIENT.on('guildMemberRemove', (member) => {
	const GUILD = member.guild;
	GUILD.channels.get(GUILD.id).sendMessage(
		CONFIG.farewellPre + member + CONFIG.farewellPost
	);
});

// message event handler
CLIENT.on('message', (message) => {
  if(!message.content.startsWith(PREFIX) || message.author.bot) {
		return;
	}

	let msg = message.content.toLowerCase(); // case-insensitive

	// command list
	if(msg.startsWith(PREFIX + 'help')) {
		message.channel.sendMessage(etc.getHelp());
	}
	else if(msg.startsWith(PREFIX + 'about')) {
			message.channel.sendMessage(etc.getAbout());
	}
	else if(msg.startsWith(PREFIX + 'bread')) {
		message.channel.sendMessage(bread.getBread(msg.split(' '), BREAD));
	}
	else if(msg.startsWith(PREFIX + 'goddess')) {
		message.channel.sendMessage(goddess.getGoddess(msg.split(' '), GODDESSES));
	}
	else if(msg.startsWith(PREFIX + 'hero')) {
		message.channel.sendMessage(hero.getHero(msg.split(' '), HEROES));
	}
	//else if(msg.startsWith(PREFIX + 'sbw')) {}
	//else if(msg.startsWith(PREFIX + 'skill')) {}
	else if(msg.startsWith(PREFIX + 'skin')) {
		message.channel.sendMessage(skin.getSkin(msg.split(' '), SKINS));
	}
	//else if(msg.startsWith(PREFIX + 'weapon')) {}
	else if(msg.startsWith(PREFIX + 'lenny')) {
		message.channel.sendMessage('( ͡° ͜ʖ ͡°)');
	}
	else if(msg.startsWith(PREFIX + 'fergus')) {
		message.channel.sendFile(
			CLIENT.user.avatarURL,	'',	`${message.author}, No.`
		); //message.reply('No.');
	}
});

CLIENT.login(CONFIG.token);

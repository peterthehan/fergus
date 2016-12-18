const DISCORD = require('discord.js');
const CLIENT = new DISCORD.Client();

// get token, prefix, welcomePre, welcomePost, farewellPre, farewellPost
// look at configEXAMPLE.json for formatting
const CONFIG = require('./config.json');
const PREFIX = CONFIG.prefix;

// get json objects
const BREAD = require('./cqdb/bread.json');
const GODDESSES = require('./cqdb/goddesses.json');
const HEROES = require('./cqdb/heroes.json');
const SBWS = require('./cqdb/sbws.json');
//const SKILLS = require('./cqdb/skills.json');
const SKINS = require('./cqdb/skins.json');
const WEAPONS = require('./cqdb/weapons.json');

// get command functions
let etc = require('./scripts/etc.js'); // !help, !about
let bread = require('./scripts/bread.js');
let goddess = require('./scripts/goddesses.js');
let hero = require('./scripts/heroes.js');
let image = require('./scripts/images.js');
let sbw = require('./scripts/sbws.js');
//let skill = require('./scripts/skills.js');
let skin = require('./scripts/skins.js');
let weapon = require('./scripts/weapons.js');

// asynchronous event handler, required for bot to read Discord messages
CLIENT.on('ready', () => {
	etc.log(CLIENT.user, `online (serving ${CLIENT.guilds.size} server(s), ${CLIENT.channels.size} channel(s), ${CLIENT.users.size} user(s))`);

	// http://stackoverflow.com/questions/6962658/randomize-setinterval-how-to-rewrite-same-random-after-random-interval
	(function loop() {
		let min = 45000, max = 75000; // in ms
		let rand = Math.floor(Math.random() * (max - min)) + min;
		setTimeout(
			function() {
				let str = etc.setGame();
				CLIENT.user.setGame(str);
				etc.log(CLIENT.user, `Playing ${str} (waited ${rand} ms)`);
				loop();
			}, rand
		);
	}());
});

// welcome event handler
CLIENT.on('guildMemberAdd', (member) => {
	member.guild.channels.get(member.guild.id).sendMessage(
		CONFIG.welcomePre + member + CONFIG.welcomePost
	);
	etc.log(member.user, 'joined');
});

// farewell event handler
CLIENT.on('guildMemberRemove', (member) => {
	member.guild.channels.get(member.guild.id).sendMessage(
		CONFIG.farewellPre + member + CONFIG.farewellPost
	);
	etc.log(member.user, 'left');
});

// node's unhandledRejection event handler
// http://eng.wealthfront.com/2016/11/03/handling-unhandledrejections-in-node-and-the-browser/
process.on('unhandledRejection', (reason) => {
	console.error('error: command used in a text channel that blocks fergus');
	//console.error(reason);
	//process.exit(1);
});

// message event handler
CLIENT.on('message', (message) => {
	if(!message.content.startsWith(PREFIX) || message.author.bot) {
		return;
	}

	// case-insensitive
	const MSG = message.content.toLowerCase();

	// command list
	if(MSG.startsWith(PREFIX + 'help')) {
		message.channel.sendMessage(etc.getHelp());
		etc.log(message.author, MSG, message.channel.name);
	}
	else if(MSG.startsWith(PREFIX + 'about')) {
		message.channel.sendMessage(etc.getAbout());
		etc.log(message.author, MSG, message.channel.name);
	}
	else if(MSG.startsWith(PREFIX + 'bread')) {
		message.channel.sendMessage(bread.getBread(MSG.split(' '), BREAD));
		etc.log(message.author, MSG, message.channel.name);
	}
	else if(MSG.startsWith(PREFIX + 'goddess')) {
		message.channel.sendMessage(goddess.getGoddess(MSG.split(' '), GODDESSES));
		etc.log(message.author, MSG, message.channel.name);
	}
	else if(MSG.startsWith(PREFIX + 'hero')) {
		message.channel.sendMessage(hero.getHero(MSG.split(' '), HEROES));
		etc.log(message.author, MSG, message.channel.name);
	}
	else if(MSG.startsWith(PREFIX + 'image')) {
		let str = image.getImage(MSG.split(' '), HEROES);
		if(str.endsWith('.png')) {
			message.channel.sendFile(str);
		}
		else {
			message.channel.sendMessage(str);
		}
		etc.log(message.author, MSG, message.channel.name);
	}
	else if(MSG.startsWith(PREFIX + 'sbw')) {
		message.channel.sendMessage(sbw.getSbw(MSG.split(' '), SBWS));
		etc.log(message.author, MSG, message.channel.name);
	}
	//else if(MSG.startsWith(PREFIX + 'skill')) {}
	else if(MSG.startsWith(PREFIX + 'skin')) {
		message.channel.sendMessage(skin.getSkin(MSG.split(' '), SKINS));
		etc.log(message.author, MSG, message.channel.name);
	}
	else if(MSG.startsWith(PREFIX + 'weapon')) {
		message.channel.sendMessage(weapon.getWeapon(MSG.split(' '), WEAPONS));
		etc.log(message.author, MSG, message.channel.name);
	}
	else if(MSG.startsWith(PREFIX + 'lenny')) {
		message.channel.sendMessage('( ͡° ͜ʖ ͡°)');
		etc.log(message.author, MSG, message.channel.name);
	}
	else if(MSG.startsWith(PREFIX + 'fergus')) {
		message.channel.sendFile(CLIENT.user.avatarURL,	'',	`${message.author}`);
		etc.log(message.author, MSG, message.channel.name);
	}
});

CLIENT.login(CONFIG.token);

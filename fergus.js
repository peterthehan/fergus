const DISCORD = require('discord.js');
const CLIENT = new DISCORD.Client();
const T = require('./token.json');
const H = require('./heroes.json');

// helper functions
function getName(hero, star) {
	let str = '';
	str += '__**' + H[hero].form[star].name + '**__ ' +
		'(' + '★'.repeat(H[hero].form[star].star) + ') | ';
	let p =	H[hero].faction;
	if(p !== '') {
		str += p + ', ';
	}
	str += H[hero].type + ', ' + H[hero].class + '\n';
	return str;
}

function getInfo(hero, star) {
	let str = '';
	str += '_' + H[hero].form[star].background + '_\n' +
		'**Acquire**: ' + H[hero].form[star].howToGet.join(', ') + '\n';
	return str;
}

function getStats(hero, star) {
	let str = '';
	str += '```' +
		' Atk. Power: ' + H[hero].form[star].atkPower.join(' → ') + '\n' +
		'         HP: ' + H[hero].form[star].hp.join(' → ') + '\n' +
		'Crit.Chance: ' + H[hero].form[star].critChance.join(' → ') + '\n' +
		'      Armor: ' + H[hero].form[star].armor.join(' → ') + '\n' +
		' Resistance: ' + H[hero].form[star].resistance.join(' → ') + '\n' +
		'Crit.Damage: ' + H[hero].form[star].critDamage.join(' → ') + '\n' +
		'   Accuracy: ' + H[hero].form[star].accuracy.join(' → ') + '\n' +
		'    Evasion: ' + H[hero].form[star].evasion.join(' → ') + '\n' +
		'```\n';
	return str;
}

function getSkill(hero, star) {
	let str = '';
	str += '**' + H[hero].skillName + '** (Lv.' + H[hero].form[star].skill.level +
		'): ' + H[hero].skillDescription + '\n';
	let p =	H[hero].form[star].skill.passive;
	if(p !== '') {
		str += '**Passive**: ' + p + '\n';
	}
	return str;
}

function getHero(args) {
	let str = '', len = args.length;
	if(len === 1) {
		str += 'help';
	}
	else {
		let hero = args[1];
		if(H[hero]) {
			let star = H[hero].form.length - 1; // default to highest form index
			if(len === 2) {
				str += getName(hero, star);
				str += getInfo(hero, star);
				str += getStats(hero, star);
				str += getSkill(hero, star);
			}
			else if(len === 3) {
				let data;
				// second arg is info|stats|skill
				if(isNaN(parseInt(args[2]))) {
					data = args[2];
					str += getName(hero, star);
					if(data === 'info') {
						str += getInfo(hero, star);
					}
					else if(data === 'stats') {
						str += getStats(hero, star);
					}
					else if(data === 'skill') {
						str += getSkill(hero, star);
					}
					else {
						str += '';
					}
				}
				// second arg is star#
				else {
					// 3-line heroes
					if(H[hero].form.length === 3) {
						if(args[2] > 3 && args[2] < 7) {
							star = args[2] - 4;
						}
					}
					// 6-line heroes
					else if(H[hero].form.length === 6){
						if(args[2] > 0 && args[2] < 7) {
							star = args[2] - 1;
						}
					}
					str += getName(hero, star);
					str += getInfo(hero, star);
					str += getStats(hero, star);
					str += getSkill(hero, star);
				}
			}
			else {
				str += '4';
				/*
				let data;
				if(isNaN(parseInt(args[2]))) {
					data = args[2];
				}
				else {

				}*/
			}
		}
		else {
			str += `"${hero}" is not a valid hero!`;
		}
	}

	return str;
}

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
		message.channel.sendMessage(getHero(msg.split(' ')));
	}
	else if(msg.startsWith(prefix + 'bread')) {
		// !bread: help
		// !bread breadName: bread information
		message.channel.sendMessage(getBread(msg.split(' ')));
	}
	else if(msg.startsWith(prefix + 'goddess')) {
		// !goddess: help
		// !goddess: goddessName: goddess information
		message.channel.sendMessage(getGoddess(msg.split(' ')));
	}
	else if(msg.startsWith(prefix + 'lenny')) {
		message.channel.sendMessage('( ͡° ͜ʖ ͡°)');
	}
	else if(msg.startsWith(prefix + 'fergus')) {
		message.reply('No.');
		message.channel.sendFile(CLIENT.user.avatarURL);
	}
});

CLIENT.login(T.token);

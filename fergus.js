const DISCORD = require('discord.js');
const CLIENT = new DISCORD.Client();

const T = require('./token.json');
const BRD = require('./json/bread.json');
const GDS = require('./json/goddesses.json');
const HRS = require('./json/heroes.json');
const SBW = require('./json/sbws.json');
const SKL = require('./json/skills.json');
const SKN = require('./json/skins.json');
const WPN = require('./json/weapons.json');

// helper function
function getName(hero, star) {
	let str = '';
	str += '__**' + H[hero].form[star].name + '**__ ' +
		'(' + '★'.repeat(H[hero].form[star].star) + ') | ';
	let t =	H[hero].faction;
	if(t !== '') {
		str += t + ', ';
	}
	str += H[hero].type + ', ' + H[hero].class + '\n';
	return str;
}

// helper function
function getInfo(hero, star) {
	let str = '';
	str += '_' + H[hero].form[star].background + '_\n' +
		'**Acquire**: ' + H[hero].form[star].howToGet.join(', ') + '\n';
	return str;
}

// helper function
function getStats(hero, star) {
	let str = '';
	str += '```' +
		' Atk. Power: ' + H[hero].form[star].atkPower.join(' → ') + '\n' +
		'         HP: ' + H[hero].form[star].hp.join(' → ') + '\n' +
		'Crit.Chance: ' + H[hero].form[star].critChance.map(x => {return (x * 100).toPrecision(3);}).join(' → ') + '\n' +
		'      Armor: ' + H[hero].form[star].armor.join(' → ') + '\n' +
		' Resistance: ' + H[hero].form[star].resistance.join(' → ') + '\n' +
		'Crit.Damage: ' + H[hero].form[star].critDamage.map(x => {return (x * 100).toPrecision(3);}).join(' → ') + '\n' +
		'   Accuracy: ' + H[hero].form[star].accuracy.map(x => {return (x * 100).toPrecision(3);}).join(' → ') + '\n' +
		'    Evasion: ' + H[hero].form[star].evasion.map(x => {return (x * 100).toPrecision(3);}).join(' → ') + '\n' +
		'```\n';
	return str;
}

// helper function
function getSkill(hero, star) {
	let str = '';
	str += '**' + H[hero].skillName + '** (Lv.' + H[hero].form[star].skill.level +
		'): ' + H[hero].skillDescription + '\n';
	let t =	H[hero].form[star].skill.passive;
	if(t !== '') {
		str += '**Passive**: ' + t + '\n';
	}
	return str;
}

function getHero(args) {
	let str = '', len = args.length;
	if(len === 1) {
		str += '```' +
			'!hero <hero name> [<info|stats|skill> <star>]\n\n' +
			'hero name: name of hero, omitting all spaces\n' +
			'<info|stats|skill'
			'e.g. !hero leon'
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
						str += getName(hero, star);
						str += getInfo(hero, star);
						str += getStats(hero, star);
						str += getSkill(hero, star);
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
				let data;
				let num, txt;
				if(isNaN(parseInt(args[2])) && !isNaN(parseInt(args[3]))) {
					num = 3;
					txt = 2;
				}
				else if(isNaN(parseInt(args[3])) && !isNaN(parseInt(args[2]))) {
					num = 2;
					txt = 3;
				}
				else {
					return 'bad';
				}
				// 3-line heroes
				if(H[hero].form.length === 3) {
					if(args[num] > 3 && args[num] < 7) {
						star = args[num] - 4;
					}
				}
				// 6-line heroes
				else if(H[hero].form.length === 6){
					if(args[num] > 0 && args[num] < 7) {
						star = args[num] - 1;
					}
				}

				data = args[txt];
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
					str += getName(hero, star);
					str += getInfo(hero, star);
					str += getStats(hero, star);
					str += getSkill(hero, star);
				}
			}
		}
		else {
			str += `"${hero}" is not a valid hero!`;
		}
	}

	return str;
}

function getBread(args) {
	let str = '', len = args.length;
	if(len === 1) {
		str += 'help';
	}
	else {
		if(isNaN(parseInt(args[1]))) {
			let bread = args[1];
			if(B[bread]) {
				str += '__**' + B[bread].name + '**__ ' +
					'(' + '★'.repeat(B[bread].star) + ')\n';
				str += '```' +
					'     Value: ' + B[bread].value + "\n" +
					'Great rate: ' + B[bread].greatRate * 100 + '%\n' +
					'      Sell: ' + B[bread].sell +
					'```';
			}
			else {
				str += `"${bread}" is not a valid bread!`;
			}
		}
		else {
			args[1] = parseInt(args[1]);
			let star;
			if(args[1] > 0 && args[1] < 7) {
				star = args[1];
			}
			else {
				star = 6; // default to highest
			}

			str += '(' + '★'.repeat(star) + '): ';
			let t = [];
			Object.keys(B).forEach(key => {
				if(B[key].star === star) {
					t.push(B[key].name);
				}
			});
			str += t.join(', ');

		}
	}
	return str;
}

function getGoddess(args) {
	let str = '', len = args.length;
	if(len === 1) {
		str += 'help';
	}
	else {
		let goddess = args[1];
		if(G[goddess]) {
			str += '__**' + G[goddess].name + '**__\n' +
				'**' + G[goddess].skillName + "**: " +
				G[goddess].skillDescription + '\n';
		}
		else {
			str += `"${goddess}" is not a valid goddess!`;
		}
	}
	return str;
}

function getSkin(args) {
	let str = '** **\n';
	if(args.length === 1) {
		str += 'help';
	}
	else {
		let hero = args[1];
		if(S[hero]) {
			for(i = 0; i < S[hero].form.length; ++i) {
				str += '__**' + S[hero].form[i].name + '**__';
				str += '```';
				if(S[hero].form[i].atkPower !== 0) {
					str += ' Atk. Power: ' + S[hero].form[i].atkPower + "\n";
				}
				if(S[hero].form[i].hp !== 0) {
					str += '         HP: ' + S[hero].form[i].hp + "\n";
				}
				if(S[hero].form[i].critChance !== 0) {
					str += 'Crit.Chance: ' + S[hero].form[i].critChance * 100 + "%\n";
				}
				if(S[hero].form[i].armor !== 0) {
					str += '      Armor: ' + S[hero].form[i].armor + "\n";
				}
				if(S[hero].form[i].resistance !== 0) {
					str += ' Resistance: ' + S[hero].form[i].resistance + "\n";
				}
				if(S[hero].form[i].critDamage !== 0) {
					str += 'Crit.Damage: ' + S[hero].form[i].critDamage * 100 + "%\n";
				}
				if(S[hero].form[i].accuracy !== 0) {
					str += '   Accuracy: ' + S[hero].form[i].accuracy * 100 + "%\n";
				}
				if(S[hero].form[i].evasion !== 0) {
					str += '    Evasion: ' + S[hero].form[i].evasion * 100 + "\n";
				}
				str += '```\n';
			}
		}
		else {
			str += `"${hero}" is not a valid hero or does not have a skin yet!`;
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
	else if(msg.startsWith(prefix + 'skin')) {
		// !skin: help
		// !skin: heroName: skin information
		message.channel.sendMessage(getSkin(msg.split(' ')));
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

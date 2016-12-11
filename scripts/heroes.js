function getName(hero, star, arr) {
	let str = '';
	str += '__**' + arr[hero].form[star].name + '**__ ' +
		'(' + '★'.repeat(arr[hero].form[star].star) + ') | ';
	let t =	arr[hero].faction;
	if(t !== '') {
		str += t + ', ';
	}
	str += arr[hero].type + ', ' + arr[hero].class + '\n';
	return str;
}

function getInfo(hero, star, arr) {
	let str = '';
	str += '_' + arr[hero].form[star].background + '_\n' +
		'**Acquire**: ' + arr[hero].form[star].howToGet.join(', ') + '\n';
	return str;
}

function getStats(hero, star, arr) {
	let str = '';
	str += '```' +
		' Atk. Power: ' + arr[hero].form[star].atkPower.join(' → ') + '\n' +
		'         HP: ' + arr[hero].form[star].hp.join(' → ') + '\n' +
		'Crit.Chance: ' + arr[hero].form[star].critChance.map(x => {return (x * 100).toPrecision(3);}).join(' → ') + '\n' +
		'      Armor: ' + arr[hero].form[star].armor.join(' → ') + '\n' +
		' Resistance: ' + arr[hero].form[star].resistance.join(' → ') + '\n' +
		'Crit.Damage: ' + arr[hero].form[star].critDamage.map(x => {return (x * 100).toPrecision(3);}).join(' → ') + '\n' +
		'   Accuracy: ' + arr[hero].form[star].accuracy.map(x => {return (x * 100).toPrecision(3);}).join(' → ') + '\n' +
		'    Evasion: ' + arr[hero].form[star].evasion.map(x => {return (x * 100).toPrecision(3);}).join(' → ') + '\n' +
		'```\n';
	return str;
}

function getSkill(hero, star, arr) {
	let str = '';
	str += '**' + arr[hero].skillName + '** (Lv.' + arr[hero].form[star].skill.level +
		'): ' + arr[hero].skillDescription + '\n';
	let t =	arr[hero].form[star].skill.passive;
	if(t !== '') {
		str += '**Passive**: ' + t + '\n';
	}
	return str;
}

function getData(h, s, arr) {
	return getInfo(h, s, arr) + getStats(h, s, arr) + getSkill(h, s, arr);
}

module.exports = {
	getHero: function(args, arr) {
		let str = '', len = args.length;
		// 0 arguments
		if(len === 1) {
			str += '**!hero list|<name> ' +
				'(info|stats|skill)|<star> <star>**, ' +
				'e.g. !hero list, ' +
				'!hero mew, !hero mew info, !hero mew 3, ' +
				'!hero mew stats 4; ' +
				'defaults to 6-star whenever <star> is not specified.';
		}
		// 1 or more arguments
		else {
			// list
			if(args[1] === 'list') {
				str += '```' + Object.keys(arr).join(', ') + '```';
			}
			// <name>
			else if(arr[args[1]]) {
				// default to highest form index
				let star = arr[args[1]].form.length - 1;
				// <name>
				if(len === 2) {
					str += getName(args[1], star, arr);
					str += getData(args[1], star, arr);
				}
				// <name> info|stats|skill|<star>
				else if(len === 3) {
					// info|stats|skill
					if(isNaN(parseInt(args[2]))) {
						str += getName(args[1], star, arr);
						if(args[2] === 'info') {
							str += getInfo(args[1], star, arr);
						}
						else if(args[2] === 'stats') {
							str += getStats(args[1], star, arr);
						}
						else if(args[2] === 'skill') {
							str += getSkill(args[1], star, arr);
						}
						// treat !hero <name> <junk> as if !hero <name>
						else {
							str += getData(args[1], star, arr);
						}
					}
					// <star>
					else {
						// no promotion heroes
						if(arr[args[1]].form.length === 1) {
							// star is accounted for when initialized
							// user star input is ignored for these heroes
						}
						// 3-promotion heroes
						else if(arr[args[1]].form.length === 3) {
							args[2] = parseInt(args[2]);
							if(args[2] > 3 && args[2] < 7) {
								star = args[2] - 4;
							}
							else {
								return `"${args[1]}" does not have a ${args[2]}-star form!`;
							}
						}
						// 6-promotion heroes
						else if(arr[args[1]].form.length === 6){
							args[2] = parseInt(args[2]);
							if(args[2] > 0 && args[2] < 7) {
								star = args[2] - 1;
							}
							else {
								return `"${args[1]}" does not have a ${args[2]}-star form!`;
							}
						}
						// exception, should not be possible to enter this case
						else {
							return 'error1';
						}
						str += getName(args[1], star, arr);
						str += getData(args[1], star, arr);
					}
				}
				// 4 arguments
				else {
					// info|stats|skill <star>
					if(isNaN(parseInt(args[2]))) {
						// no promotion heroes
						if(arr[args[1]].form.length === 1) {
							// star is accounted for when initialized
							// user star input is ignored for these heroes
						}
						// 3-promotion heroes
						else if(arr[args[1]].form.length === 3) {
							args[3] = parseInt(args[3]);
							if(args[3] > 3 && args[3] < 7) {
								star = args[3] - 4;
							}
							else {
								return `"${args[1]}" does not have a ${args[3]}-star form!`;
							}
						}
						// 6-promotion heroes
						else if(arr[args[1]].form.length === 6){
							args[3] = parseInt(args[3]);
							if(args[3] > 0 && args[3] < 7) {
								star = args[3] - 1;
							}
							else {
								return `"${args[1]}" does not have a ${args[3]}-star form!`;
							}
						}
						// exception, should not be possible to enter this case
						else {
							return 'error2';
						}

						str += getName(args[1], star, arr);
						if(args[2] === 'info') {
							str += getInfo(args[1], star, arr);
						}
						else if(args[2] === 'stats') {
							str += getStats(args[1], star, arr);
						}
						else if(args[2] === 'skill') {
							str += getSkill(args[1], star, arr);
						}
						// treat !hero <name> <junk> <star> as if !hero <name> <star>
						else {
							str += getData(args[1], star, arr);
						}
					}
					// <star> info|stats|skill
					else {
						// no promotion heroes
						if(arr[args[1]].form.length === 1) {
							// star is accounted for when initialized
							// user star input is ignored for these heroes
						}
						// 3-promotion heroes
						else if(arr[args[1]].form.length === 3) {
							args[2] = parseInt(args[2]);
							if(args[2] > 3 && args[2] < 7) {
								star = args[2] - 4;
							}
							else {
								return `"${args[1]}" does not have a ${args[2]}-star form!`;
							}
						}
						// 6-promotion heroes
						else if(arr[args[1]].form.length === 6){
							args[2] = parseInt(args[2]);
							if(args[2] > 0 && args[2] < 7) {
								star = args[2] - 1;
							}
							else {
								return `"${args[1]}" does not have a ${args[2]}-star form!`;
							}
						}
						// exception, should not be possible to enter this case
						else {
							return 'error2';
						}

						str += getName(args[1], star, arr);
						if(args[3] === 'info') {
							str += getInfo(args[1], star, arr);
						}
						else if(args[3] === 'stats') {
							str += getStats(args[1], star, arr);
						}
						else if(args[3] === 'skill') {
							str += getSkill(args[1], star, arr);
						}
						// treat !hero <name> <star> <junk> as if !hero <name> <star>
						else {
							str += 'wip'
						}
					}
				}
			}
			else {
				str += `"${args[1]}" is not a valid hero name!`;
			}
		}
		return str;
	}
};

// !hero: help
// !hero heroName: all hero information for 6 star
// !hero heroName star#: all hero information for # star
// !hero heroName info|stats|skill: hero information for 6 star
// !hero heroName (info|stats|skill star#): hero information for # star
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

module.exports = {
	getHero: function(args, arr) {
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
			if(arr[hero]) {
				let star = arr[hero].form.length - 1; // default to highest form index
				if(len === 2) {
					str += getName(hero, star, arr);
					str += getInfo(hero, star, arr);
					str += getStats(hero, star, arr);
					str += getSkill(hero, star, arr);
				}
				else if(len === 3) {
					let data;
					// second arg is info|stats|skill
					if(isNaN(parseInt(args[2]))) {
						data = args[2];
						str += getName(hero, star, arr);
						if(data === 'info') {
							str += getInfo(hero, star, arr);
						}
						else if(data === 'stats') {
							str += getStats(hero, star, arr);
						}
						else if(data === 'skill') {
							str += getSkill(hero, star, arr);
						}
						else {
							str += getName(hero, star, arr);
							str += getInfo(hero, star, arr);
							str += getStats(hero, star, arr);
							str += getSkill(hero, star, arr);
						}
					}
					// second arg is star#
					else {
						// 3-line heroes
						if(arr[hero].form.length === 3) {
							if(args[2] > 3 && args[2] < 7) {
								star = args[2] - 4;
							}
						}
						// 6-line heroes
						else if(arr[hero].form.length === 6){
							if(args[2] > 0 && args[2] < 7) {
								star = args[2] - 1;
							}
						}
						str += getName(hero, star, arr);
						str += getInfo(hero, star, arr);
						str += getStats(hero, star, arr);
						str += getSkill(hero, star, arr);
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
					if(arr[hero].form.length === 3) {
						if(args[num] > 3 && args[num] < 7) {
							star = args[num] - 4;
						}
					}
					// 6-line heroes
					else if(arr[hero].form.length === 6){
						if(args[num] > 0 && args[num] < 7) {
							star = args[num] - 1;
						}
					}

					data = args[txt];
					str += getName(hero, star, arr);
					if(data === 'info') {
						str += getInfo(hero, star, arr);
					}
					else if(data === 'stats') {
						str += getStats(hero, star, arr);
					}
					else if(data === 'skill') {
						str += getSkill(hero, star, arr);
					}
					else {
						str += getName(hero, star, arr);
						str += getInfo(hero, star, arr);
						str += getStats(hero, star, arr);
						str += getSkill(hero, star, arr);
					}
				}
			}
			else {
				str += `"${hero}" is not a valid hero!`;
			}
		}

		return str;
	}
};

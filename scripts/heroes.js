// helper function, get string
function getName(h, s, arr) {
	let str = '';
	str += '__**' + arr[h].form[s].name + '**__ ' +
		'(' + '★'.repeat(arr[h].form[s].star) + ') | ';
	let t =	arr[h].faction;
	if(t !== '') {
		str += t + ', ';
	}
	str += arr[h].type + ', ' + arr[h].class + '\n';
	return str;
}

// helper function, get string
function getInfo(h, s, arr) {
	return '_' + arr[h].form[s].background + '_\n' +
		'**Acquire**: ' + arr[h].form[s].howToGet.join(', ') + '\n';
}

// helper function, get string
function getStats(h, s, arr) {
	return '```' +
		'\xa0Atk. Power: ' + arr[h].form[s].atkPower.join(' → ') + '\n' +
		'         HP: ' + arr[h].form[s].hp.join(' → ') + '\n' +
		'Crit.Chance: ' + arr[h].form[s].critChance.map(x => (x * 100).toPrecision(3)).join(' → ') + '\n' +
		'      Armor: ' + arr[h].form[s].armor.join(' → ') + '\n' +
		' Resistance: ' + arr[h].form[s].resistance.join(' → ') + '\n' +
		'Crit.Damage: ' + arr[h].form[s].critDamage.map(x => (x * 100).toPrecision(3)).join(' → ') + '\n' +
		'   Accuracy: ' + arr[h].form[s].accuracy.map(x => (x * 100).toPrecision(3)).join(' → ') + '\n' +
		'    Evasion: ' + arr[h].form[s].evasion.map(x => (x * 100).toPrecision(3)).join(' → ') +
		'```\n';
}

// helper function, get string
function getSkill(h, s, arr) {
	let str = '';
	str += '**' + arr[h].skillName + '** (Lv.' + arr[h].form[s].skill.level +
		'): ' + arr[h].skillDescription + '\n';
	let t =	arr[h].form[s].skill.passive;
	if(t !== '') {
		str += '**Passive**: ' + t;
	}
	return str;
}

// helper function, get string
function getAll(h, s, arr) {
	return getInfo(h, s, arr) + getStats(h, s, arr) + getSkill(h, s, arr);
}

// helper function, get star
function getStar(h, s, arr) {
	let star;
	// no promotion heroes
	if(arr[h].form.length === 1) {
		// star is accounted for when initialized
		// user star input is ignored for these heroes
		star = arr[h].form.length - 1;
	}
	// 3-promotion heroes
	else if(arr[h].form.length === 3) {
		s = parseInt(s);
		if(s > 3 && s < 7) {
			star = s - 4;
		}
		else {
			return `"${h}" does not have a ${s}-star form!`;
		}
	}
	// 6-promotion heroes
	else if(arr[h].form.length === 6){
		s = parseInt(s);
		if(s > 0 && s < 7) {
			star = s - 1;
		}
		else {
			return `"${h}" does not have a ${s}-star form!`;
		}
	}
	// exception, should not be possible to enter this case
	else {
		return 'error0';
	}
	return star;
}

// helper function, get data
function getData(h, s, d, arr) {
	let str = '';
	str += getName(h, s, arr);
	if(d === 'info') {
		str += getInfo(h, s, arr);
	}
	else if(d === 'stats') {
		str += getStats(h, s, arr);
	}
	else if(d === 'skill') {
		str += getSkill(h, s, arr);
	}
	// treat !hero <name> <junk> as if !hero <name>
	// treat !hero <name> <junk> <star> as if !hero <name> <star>
	// treat !hero <name> <star> <junk> as if !hero <name> <star>
	else {
		str += getAll(h, s, arr);
	}
	return str;
}

module.exports = {
	getHero: function(args, arr) {
		let str = '', len = args.length;
		// 0 arguments
		if(len === 1) {
			str += '**!hero list|<name> ' +
				'(info|stats|skill)|<star> <star>|(info|stats|skill)**, ' +
				'e.g. !hero list, ' +
				'!hero mew, !hero mew info, !hero mew 3, ' +
				'!hero mew stats 4; ' +
				'Defaults to 6-star whenever <star> is not specified.';
		}
		// 1 or more arguments
		else {
			// list
			if(args[1] === 'list') {
				str += '```' + Object.keys(arr).join(', ') + '```';
			}
			// <name> exists
			else if(arr[args[1]]) {
				// default to highest form index
				let star = arr[args[1]].form.length - 1;

				// 1 argument, <name>
				if(len === 2) {
					str += getName(args[1], star, arr);
					str += getAll(args[1], star, arr);
				}
				// 2 arguments, <name> (info|stats|skill)|<star>
				else if(len === 3) {
					// <name> (info|stats|skill)
					if(isNaN(parseInt(args[2]))) {
						str += getData(args[1], star, args[2], arr);
					}
					// <name> <star>
					else {
						star = getStar(args[1], args[2], arr);
						if(isNaN(parseInt(star))) {
							str += star;
						}
						else {
							str += getName(args[1], star, arr);
							str += getAll(args[1], star, arr);
						}
					}
				}
				// 3 arguments
				// <name> (info|stats|skill)|<star> <star>|(info|stats|skill)
				else {
					// <name> (info|stats|skill) <star>
					if(isNaN(parseInt(args[2])) && !isNaN(parseInt(args[3]))) {
						star = getStar(args[1], args[3], arr);
						if(isNaN(parseInt(star))) {
							str += star;
						}
						else {
							str += getData(args[1], star, args[2], arr);
						}
					}
					// <name> <star> (info|stats|skill)
					else if(!isNaN(parseInt(args[2])) && isNaN(parseInt(args[3]))){
						star = getStar(args[1], args[2], arr);
						if(isNaN(parseInt(star))) {
							str += star;
						}
						else {
							str += getData(args[1], star, args[3], arr);
						}
					}
					// one of the inputs is junk, treat as if 2 arguments
					else {
						if(isNaN(parseInt(args[2])) && isNaN(parseInt(args[3]))) {
							if(args[2] === 'info' || args[2] === 'stats' || args[2] === 'skill') {
								str += getData(args[1], star, args[2], arr);
							}
							else if(args[3] === 'info' || args[3] === 'stats' || args[3] === 'skill') {
								str += getData(args[1], star, args[3], arr);
							}
							// both inputs are junk, treat as if 1 argument
							else {
								str += getName(args[1], star, arr);
								str += getAll(args[1], star, arr);
							}
						}
						else {
							if(args[2] > 0 && args[2] < 7) {
								star = getStar(args[1], args[2], arr);
								if(isNaN(parseInt(star))) {
									str += star;
								}
								else {
									str += getName(args[1], star, arr);
									str += getAll(args[1], star, arr);
								}
							}
							else if(args[3] > 0 && args[3] < 7) {
								star = getStar(args[1], args[3], arr);
								if(isNaN(parseInt(star))) {
									str += star;
								}
								else {
									str += getName(args[1], star, arr);
									str += getAll(args[1], star, arr);
								}
							}
							// both inputs are junk, treat as if 1 argument
							else {
								str += getName(args[1], star, arr);
								str += getAll(args[1], star, arr);
							}
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

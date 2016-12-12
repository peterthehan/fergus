// helper function, get string
function getStats(h, arr) {
	let str = '';
	for(i = 0; i < arr[h].form.length; ++i) {
		str += '__**' + arr[h].form[i].name + '**__\n```';
		if(arr[h].form[i].atkPower !== 0) {
			str += '\xa0Atk. Power: ' + arr[h].form[i].atkPower + "\n";
		}
		if(arr[h].form[i].hp !== 0) {
			str += '\xa0        HP: ' + arr[h].form[i].hp + "\n";
		}
		if(arr[h].form[i].critChance !== 0) {
			str += 'Crit.Chance: ' + arr[h].form[i].critChance * 100 + "%\n";
		}
		if(arr[h].form[i].armor !== 0) {
			str += '\xa0     Armor: ' + arr[h].form[i].armor + "\n";
		}
		if(arr[h].form[i].resistance !== 0) {
			str += '\xa0Resistance: ' + arr[h].form[i].resistance + "\n";
		}
		if(arr[h].form[i].critDamage !== 0) {
			str += 'Crit.Damage: ' + arr[h].form[i].critDamage * 100 + "%\n";
		}
		if(arr[h].form[i].accuracy !== 0) {
			str += '\xa0  Accuracy: ' + arr[h].form[i].accuracy * 100 + "%\n";
		}
		if(arr[h].form[i].evasion !== 0) {
			str += '\xa0   Evasion: ' + arr[h].form[i].evasion * 100 + "\n";
		}
		str += '```\n';
	}
	return str;
}

module.exports = {
	getSkin: function(args, arr) {
		let str = '', len = args.length;
		// 0 arguments
		if(len === 1) {
			str += '**!skin list|<name>**, ' +
				'e.g. !skin list, !skin mew';
		}
		// 1 or more arguments
		else {
			if(arr[args[1]]) {
				if(arr[args[1]].form.length !== 0) {
					str += getStats(args[1], arr);
				}
				else {
					str += `"${args[1]}" does not have a skin yet!`;
				}
			}
			else {
				str += `"${args[1]}" is not a valid hero name!`;
			}
		}
		return str;
	}
};

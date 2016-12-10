module.exports = {
	getSkin: function(args, arr) {
		let str = '';
		if(args.length === 1) {
			str += 'help';
		}
		else {
			let hero = args[1];
			if(arr[hero]) {
				for(i = 0; i < arr[hero].form.length; ++i) {
					str += '__**' + arr[hero].form[i].name + '**__';
					str += '```';
					if(arr[hero].form[i].atkPower !== 0) {
						str += ' Atk. Power: ' + arr[hero].form[i].atkPower + "\n";
					}
					if(arr[hero].form[i].hp !== 0) {
						str += '         HP: ' + arr[hero].form[i].hp + "\n";
					}
					if(arr[hero].form[i].critChance !== 0) {
						str += 'Crit.Chance: ' + arr[hero].form[i].critChance * 100 + "%\n";
					}
					if(arr[hero].form[i].armor !== 0) {
						str += '      Armor: ' + arr[hero].form[i].armor + "\n";
					}
					if(arr[hero].form[i].resistance !== 0) {
						str += ' Resistance: ' + arr[hero].form[i].resistance + "\n";
					}
					if(arr[hero].form[i].critDamage !== 0) {
						str += 'Crit.Damage: ' + arr[hero].form[i].critDamage * 100 + "%\n";
					}
					if(arr[hero].form[i].accuracy !== 0) {
						str += '   Accuracy: ' + arr[hero].form[i].accuracy * 100 + "%\n";
					}
					if(arr[hero].form[i].evasion !== 0) {
						str += '    Evasion: ' + arr[hero].form[i].evasion * 100 + "\n";
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
};

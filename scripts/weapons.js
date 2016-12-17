module.exports = {
	getWeapon: function(args, arr) {
		let str = '', len = args.length;
		// 0 arguments, !weapon
		if(len === 1) {
			str = '*!weapon list|<star>|<class>|<name>*, ' +
				'e.g. !weapon list, !weapon 4, !weapon sword, !weapon redfalchion';
		}
		// 1 argument or more, !weapon list|<star>|<class>|<name>
		else {
			// !weapon list
			if(args[1] === 'list') {
				str = '```' + Object.keys(arr).join(', ') + '```';
			}
			// !weapon <star>
			else if(!isNaN(parseInt(args[1]))){
				args[1] = parseInt(args[1]);
				// if <star> is within bounds
				if(args[1] > 0 && args[1] < 7) {
					let t = [];
					Object.keys(arr).forEach((key) => {
						if(arr[key].star === args[1]) {
							t.push(arr[key].name);
						}
					});
					str = '(' + '★'.repeat(args[1]) + ')\n```' + t.join(', ') +	'```';
				}
				else {
					str = `${args[1]}-star weapons do not exist!`;
				}
			}
			// !weapon <class>|<name>
			else {
				// !weapon <name>
				if(arr[args[1]]) {
					str = '__**' + arr[args[1]].name + '**__ ' +
						'(' + '★'.repeat(arr[args[1]].star) + ') | ' + arr[args[1]].class +
						'\n```' +
						'Atk. Power: ' + arr[args[1]].atkPower + '\n' +
						'Atk. Speed: ' + arr[args[1]].atkSpeed + '\n' +
						'   Options: ' + arr[args[1]].options.join(', ') + '```\n' +
						'**Acquire**: ' + arr[args[1]].howToGet.join(', ');
				}
				// !weapon <class>
				else if(
					args[1] === 'sword' || args[1] === 'hammer' ||
					args[1] === 'bow' || args[1] === 'gun' ||
					args[1] === 'staff' || args[1] === 'orb'
				) {
					let t = [];
					Object.keys(arr).forEach((key) => {
						if(arr[key].class.toLowerCase() === args[1]) {
							t.push(arr[key].name);
						}
					});
					str = '```' + t.join(', ') +	'```';
				}
				// !weapon <junk>
				else {
					str = `${args[1]} is not a valid weapon name or weapon class!`;
				}
			}
		}
		return str;
	}
};

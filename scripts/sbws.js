// helper function, get string
function getStats(h, s, arr) {
	return '__**' + arr[h].form[s].name + '**__ ' +
		'(' + '★'.repeat(arr[h].form[s].star) + ')\n```' +
		'Atk. Power: ' + arr[h].form[s].atkPower + '\n' +
		'Atk. Speed: ' + arr[h].form[s].atkSpeed + '```\n' +
		'**Ability**: ' + arr[h].form[s].ability;
}

// helper function, get star
function getStar(h, s, arr) {
	let star;

	// all sbws have 3-promotion
	if(arr[h].form.length === 3) {
		s = parseInt(s);
		if(s > 3 && s < 7) {
			star = s - 4;
		}
		else {
			return `${h}'s sbw does not have a ${s}-star form!`;
		}
	}
	// exception, should not be possible to enter this case
	else {
		console.log('error');
		return 'Error: Please let the bot author know or submit an issue at https://github.com/Johj/fergus/issues';
	}
	return star;
}

module.exports = {
	getSbw: function(args, arr) {
		let str = '', len = args.length;
		// 0 arguments, !sbw
		if(len === 1) {
			str = '*!sbw list|<name> <star>*, ' +
				'e.g. !sbw list, !sbw mew, !sbw mew 6; ' +
				'Defaults to 6-star whenever *<star>* is not specified.';
		}
		// 1 argument or more, !sbw list|<name> <star>
		else {
			// !sbw list
			if(args[1] === 'list') {
				let t = [];
				Object.keys(arr).forEach((key) => {
					if(arr[key].form.length !== 0) {
						t.push(key);
					}
				});
				str = '```' + t.join(', ') + '```';
			}
			// !sbw <name> [<star>]
			else if(arr[args[1]]) {
				if(arr[args[1]].form.length !== 0) {
					// default to highest form index
					let star = arr[args[1]].form.length - 1;

					// 1 argument, !sbw <name>
					if(len === 2) {
						str = getStats(args[1], star, arr);
					}
					// 2 arguments or more, !sbw <name> <star>
					else {
						// !sbw <name> <star>
						if(!isNaN(parseInt(args[2]))) {
							star = getStar(args[1], args[2], arr);
							if(isNaN(parseInt(star))) {
								str = star;
							}
							else {
								str = getStats(args[1], star, arr);
							}
						}
						// !sbw <name> <junk>, treat as if !sbw <name>
						else {
							str = getStats(args[1], star, arr);
						}
					}
				}
				else {
					str = `${args[1]} does not have an sbw yet!`;
				}
			}
			// !sbw <junk>
			else {
				str = `${args[1]} is not a valid hero name!`;
			}
		}
		return str;
	}
};

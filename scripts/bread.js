module.exports = {
	getBread: function(args, arr) {
		let str = '', len = args.length;
		// 0 arguments
		if(len === 1) {
			str += '*!bread list|<star>|<name>*, ' +
				'e.g. !bread list, !bread 6, !bread macaroon';
		}
		// 1 argument or more
		else {
			// list
			if(args[1] === 'list') {
				str += '```' + Object.keys(arr).join(', ') + '```';
			}
			// <star>
			else if(!isNaN(parseInt(args[1]))){
				args[1] = parseInt(args[1]);
				// if star is within bounds
				if(args[1] > 0 && args[1] < 7) {
					str += '(' + '★'.repeat(args[1]) + ')\n```';

					let t = [];
					Object.keys(arr).forEach((key) => {
						if(arr[key].star === args[1]) {
							t.push(arr[key].name);
						}
					});

					str += t.join(', ') +	'```';
				}
				else {
					str += `${args[1]}-star breads do not exist!`;
				}
			}
			// <name>
			else if(arr[args[1]]) {
				str += '__**' + arr[args[1]].name + '**__ ' +
					'(' + '★'.repeat(arr[args[1]].star) + ')\n```' +
					'\xa0    Value: ' + arr[args[1]].value + "\n" +
					'Great rate: ' + arr[args[1]].greatRate * 100 + '%\n' +
					'      Sell: ' + arr[args[1]].sell + '```';
			}
			else {
				str += `"${args[1]}" is not a valid bread name!`;
			}
		}
		return str;
	}
};

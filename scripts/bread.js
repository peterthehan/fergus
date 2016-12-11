// !bread: help
// !bread breadName: bread information
module.exports = {
	getBread: function(args, arr) {
		let str = '', len = args.length;
		if(len === 1) {
			str += 'help';
		}
		else {
			if(isNaN(parseInt(args[1]))) {
				let bread = args[1];
				if(arr[bread]) {
					str += '__**' + arr[bread].name + '**__ ' +
						'(' + '★'.repeat(arr[bread].star) + ')\n';
					str += '```' +
						'     Value: ' + arr[bread].value + "\n" +
						'Great rate: ' + arr[bread].greatRate * 100 + '%\n' +
						'      Sell: ' + arr[bread].sell +
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
				Object.keys(arr).forEach(key => {
					if(arr[key].star === star) {
						t.push(arr[key].name);
					}
				});
				str += t.join(', ');

			}
		}
		return str;
	}
};

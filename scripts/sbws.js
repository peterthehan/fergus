// helper function, get string
function getStats(h, arr) {
	let str = '';
	
	return str;
}

module.exports = {
	getSbw: function(args, arr) {
		let str = '', len = args.length;
		// 0 arguments
		if(len === 1) {
			str += '*!sbw list|<name>*, ' +
				'e.g. !sbw list, !sbw mew';
		}
		// 1 or more arguments
		else {
			// list
			if(args[1] === 'list') {
				let t = [];
				Object.keys(arr).forEach((key) => {
					if(arr[key].form.length !== 0) {
						t.push(key);
					}
				});
				str += '```' + t.join(', ') + '```';
			}
			// <name>
			else if(arr[args[1]]) {
				if(arr[args[1]].form.length !== 0) {
					str += getStats(args[1], arr);
				}
				else {
					str += `"${args[1]}" does not have an sbw yet!`;
				}
			}
			else {
				str += `"${args[1]}" is not a valid hero name!`;
			}
		}
		return str;
	}
};

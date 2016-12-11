module.exports = {
	getGoddess: function(args, arr) {
		let str = '', len = args.length;
		// 0 arguments
		if(len === 1) {
			str += '**!goddess list|<name>**, ' +
				'e.g. !goddess list, !goddess sera';
		}
		// 1 or more arguments
		else {
			// list
			if(args[1] === 'list') {
				str += '```' + Object.keys(arr).join(', ') + '```';
			}
			// <name>
			else if(arr[args[1]]) {
				str += '__**' + arr[args[1]].name + '**__\n' +
					'**' + arr[args[1]].skillName + "**: " +
					arr[args[1]].skillDescription + '\n';
			}
			else {
				str += `"${args[1]}" is not a valid goddess name!`;
			}
		}
		return str;
	}
};

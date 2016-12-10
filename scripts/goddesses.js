module.exports = {
	getGoddess: function(args, arr) {
		let str = '', len = args.length;
		if(len === 1) {
			str += 'help';
		}
		else {
			let goddess = args[1];
			if(arr[goddess]) {
				str += '__**' + arr[goddess].name + '**__\n' +
					'**' + arr[goddess].skillName + "**: " +
					arr[goddess].skillDescription + '\n';
			}
			else {
				str += `"${goddess}" is not a valid goddess!`;
			}
		}
		return str;
	}
};

const COMMANDS = [
	'help', 'about',
	'bread', 'goddess', 'hero', 'sbw', 'skill', 'skin', 'weapon',
	'lenny', 'fergus'
];

module.exports = {
	getHelp: function() {
		let str = '';
		str += '__**Commands**__: ' +
			COMMANDS.map(i => {return '!' + i}).join(', ');
		return str;
	},
	getAbout: function() {
		let str = '';
		str += `__**Fergus by Peter Han (Saarja)**__\n` +
			'Want to contribute, request a feature, or submit an issue?\n' +
			'Visit: https://github.com/Johj/fergus';
		return str;
	}
};

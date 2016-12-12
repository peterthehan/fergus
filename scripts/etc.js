const COMMANDS = [
	'help', 'about',
	'bread', 'goddess', 'hero', 'sbw', 'skill', 'skin', 'weapon',
	'lenny', 'fergus'
];

module.exports = {
	getHelp: function() {
		let str = '';
		str += '**Commands**: ' +	COMMANDS.map((i) => {return '!' + i}).join(', ');
		return str;
	},
	getAbout: function() {
		let str = '';
		str += `**Fergus by Peter Han (Saarja)**\n` +
			'Want to contribute, request a feature, or submit an issue? ' +
			'Visit: https://github.com/Johj/fergus';
		return str;
	}
};

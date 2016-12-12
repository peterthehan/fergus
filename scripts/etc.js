const COMMANDS = [
	'help', 'about',
	'bread', 'goddess', 'hero', 'sbw', 'skill', 'skin', 'weapon',
	'lenny', 'fergus'
];

module.exports = {
	getHelp: function() {
		return '**Commands**: ' + COMMANDS.map(x => '!' + x).join(', ');
	},
	getAbout: function() {
		return '**By Peter Han (Saarja)**; ' +
			'Want to contribute, request a feature, or submit an issue? ' +
			'Visit: https://github.com/Johj/fergus';
	}
};

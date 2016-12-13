const COMMANDS = [
	'help',
	'about',
	'bread',
	'goddess',
	'hero',
	//'sbw',
	//'skill',
	'skin',
	//'weapon',
	'lenny',
	'shrug',
	'fergus'
];

module.exports = {
	getHelp: function() {
		return 'Commands: ' + COMMANDS.map(x => '!' + x).join(', ');
	},
	getAbout: function() {
		return 'By Peter Han (Saarja); ' +
			'Want to help contribute, suggest a feature, or submit an issue? ' +
			'Visit: https://github.com/Johj/fergus';
	},
	log: function(user, msg) { // for debugging
		console.log(`${user.username}#${user.discriminator}: ${msg}`);
	}
};

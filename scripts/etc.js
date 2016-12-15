const COMMANDS = [
	'help',
	'about',
	'bread',
	'goddess',
	'hero',
	'sbw',
	//'skill',
	'skin',
	'weapon',
	'lenny',
	'shrug',
	'fergus'
];

module.exports = {
	getHelp: function() {
		return 'Commands: ' + COMMANDS.map(x => '!' + x).join(', ');
	},
	getAbout: function() {
		return 'Fergus by Peter Han (Saarja); ' +
			'Special thanks to the following individuals for their contributions to the Crusaders Quest database:\n```' +
			'Poiya, Fastrail, F1r3man```\n' +
			'Want to help contribute, suggest a feature, or submit an issue? ' +
			'Visit: https://github.com/Johj/fergus';
	},
	log: function(user, msg) { // for debugging
		console.log(`${user.username}#${user.discriminator}: ${msg}`);
	}
};

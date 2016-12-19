const GAMES = [
	'!help',
	'with your dream sbw.',
	'with your gold.',
	'with your heart.',
	'with your iron.',
	'with your jewels.',
	'with your rerolls.',
	'with Arjuna.',
	'with Bridget.',
	'with Celine.',
	'with Chocolat.',
	'with Hellad.',
	'with Lednas.',
	'with Pandora.',
	'with Popo.',
	'(╯°□°）╯︵ ┻━┻',
	'( ͡° ͜ʖ ͡°)'
];

const COMMANDS = [
	'help',
	'about',
	'bread',
	'goddess',
	'hero',
	'image',
	'sbw',
	//'skill',
	'skin',
	'weapon',
	'lenny',
	'fergus'
];

module.exports = {
	setGame: function() {
		return GAMES[Math.floor((Math.random() * GAMES.length))];
	},
	getHelp: function() {
		return 'Commands: ' + COMMANDS.map(x => '!' + x).join(', ');
	},
	getAbout: function() {
		return 'Fergus by Peter Han (Saarja); ' +
			'Special thanks to the following individuals for their contributions to the Crusaders Quest database:\n' +
			'```Poiya, Fastrail, F1r3man, Protease, TheEggCake```\n' +
			'Want to help contribute, suggest a feature, or submit an issue? ' +
			'Visit: https://github.com/Johj/fergus';
	},
	log: function(user, msg, channel = '') { // for debugging
		console.log(
			`${user.username}#${user.discriminator}: ` +
			(channel === '' ? '' : `(#${channel}) `) +  `${msg}`
		);
	}
};

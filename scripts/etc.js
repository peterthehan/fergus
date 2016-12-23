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
  ':^)',
  '(╯°□°）╯︵ ┻━┻',
  '( ͡° ͜ʖ ͡°)',
];

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
  'fergus',
];

function getGame() {
  return GAMES[Math.floor((Math.random() * GAMES.length))];
}

function getHelp() {
  const discord = require('discord.js');
  const embed = new discord.RichEmbed()
    .setColor('#ebb74e')
    .setTitle('Commands')
    .setDescription(COMMANDS.map(i => '!' + i).join(', '));
  return embed;
}

function getAbout() {
  const discord = require('discord.js');
  const embed = new discord.RichEmbed()
    .setColor('#ebb74e')
    .setTitle('Fergus')
    .setDescription('by Peter Han (Saarja)')
    .addField(
      'Special thanks to the following individuals for their contributions ' +
      'to the project',
      'Poiya, Fastrail, fioritura, F1r3man, Protease, TheEggCake')
    .addField(
      'Want to help contribute, suggest a feature, or submit an issue?',
      'Visit: https://github.com/Johj/fergus')
    .setURL();
  return embed;
}

function log(user, message, channel = '') { // for debugging
  console.log(
    `${user.username}#${user.discriminator}: ` +
    (channel === '' ? '' : `(#${channel}) `) +  `${message}`);
}

module.exports = {getGame, getHelp, getAbout, log};

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

function getEmbedStarter() {
  const discord = require('discord.js');
  const embed = new discord.RichEmbed().setColor('#ebb74e');
  return embed;
}

function getHelp() {
  const embed = getEmbedStarter()
    .setTitle('Commands')
    .setDescription(COMMANDS.map(i => '!' + i).join(', '));
  return embed;
}

function getAbout() {
  const embed = getEmbedStarter()
    .setTitle('Fergus')
    .setDescription('by Peter Han (Saarja)')
    .addField(
      'Special thanks to',
      'Poiya, Fastrail, fioritura, F1r3man, Protease, TheEggCake')
    .addField(
      'Want to help contribute, suggest a feature, or submit an issue?',
      'Visit: https://github.com/Johj/fergus');
    //.setURL();
  return embed;
}

function getLenny(args) {
  let times = 1;
  if (args.length > 1) {
    if (!isNaN(parseInt(args[1]))) {
      args[1] = parseInt(args[1]);
      if (args[1] > 10) {
        times = 10;
      } else if (args[1] < 1) {
        times = 1;
      } else {
        times = args[1];
      }
    }
  }
  const embed = getEmbedStarter()
    .setDescription(
      new Array(times + 1).join(GAMES[GAMES.length - 1] + ' '));
  return embed;
}

function getFergus() {
  const embed = getEmbedStarter()
    .setImage('https://raw.githubusercontent.com/Johj/fergus/master/assets/fergus.png');
  return embed;
}

function log(user, message, channel = '') { // for debugging
  console.log(
    `${user.username}#${user.discriminator}: ` +
    (channel === '' ? '' : `(#${channel}) `) +  `${message}`);
}

module.exports = {getGame, getHelp, getAbout, getLenny, getFergus, log};

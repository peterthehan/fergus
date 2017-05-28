const config = require('../config.json');
const embed = require('../util/embed.js');

exports.run = (message, args) => {
  const cmds = {
    'Bot': [
      'about',
      'help',
      'ping',
      'status',
    ],
    'Database': [
      'berry',
      'block',
      'bread',
      'find',
      'goddess',
      'hero',
      'rank',
      'sbw',
      'skill',
      'skin',
      'stats',
      'weapon',
    ],
    'Utility': [
      'fergus',
      'forge',
      'interact',
      'links',
      'pick',
      'popo',
      'pull',
    ],
    'Miscellaneous': [
      '8ball',
      'coin',
      'delete',
      'lenny',
      'math',
      'mock',
      'print',
      'remindme',
      'server',
      'slap',
      'square',
      //'user',
    ],
    'Reserved': [
      'eval',
      'leave',
      'playing',
      'scrape',
    ],
  };

  const e = embed.process({
    title: 'Commands',
    fields: Object.keys(cmds).map(currentValue => {
      return {
        name: currentValue,
        value: cmds[currentValue].map(i => config.prefix + i).join(', '),
        inline: false,
      };
    }),
  });

  message.channel.send({ embed: e, });
  return true;
}

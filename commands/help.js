const config = require('../config.json');
const embed = require('../util/embed.js');

exports.run = (message, args) => {
  const cmds = {
    'Bot': [
      'about',
      'help',
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
      //'tip',
      'weapon',
    ],
    'Utility': [
      'coin',
      'forge',
      'links',
      'math',
      'pick',
      'ping',
      'popo',
      'pull',
      'server',
      //'user',
    ],
    'Miscellaneous': [
      '8ball',
      'fergus',
      'lenny',
      'mock',
      //'print',
      //'quote',
      'slap',
      'square',
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

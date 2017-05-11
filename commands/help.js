const config = require('../config.json');

exports.run = (message, args) => {
  const cmds = {
    'Bot': [
      'help',
      'about',
      'status',
    ],
    'Database': [
      'berry',
      'block',
      'bread',
      'find',
      'goddess',
      'hero',
      'sbw',
      'skill',
      'skin',
      'stats',
      //'tip',
      'weapon',
    ],
    'Utility': [
      'coin',
      'links',
      'math',
      'pick',
      'ping',
      'popo',
      'server',
      //'user',
    ],
    'Miscellaneous': [
      '8ball',
      'fergus',
      'lenny',
      //'print',
      //'quote',
      'slap',
      'square',
    ],
  };

  const embed = {
    title: 'Commands',
    fields: Object.keys(cmds).map(currentValue => {
      return { name: currentValue, value: cmds[currentValue].map(i => config.prefix + i).join(', ') };
    })
  }

  message.channel.send({ embed: embed });
  return true;
};

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
      //'tip',
      'weapon',
    ],
    'Utility': [
      'coin',
      'links',
      'math',
      'ping',
      'popo',
      //'remindme',
      'server',
      //'user',
    ],
    'Miscellaneous': [
      '8ball',
      'fergus',
      'lenny',
      //'print',
      //'quote',
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

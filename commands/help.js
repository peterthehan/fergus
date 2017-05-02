const config = require('../config.json');

exports.run = (message, args) => {
  const cmds = {
    'Bot': [
      'help',
      'about',
      'status',
    ],
    'Game': [
      'block',
      'bread',
      'find',
      'goddess',
      'hero',
      //'portrait',
      //'sbw',
      //'skill',
      'skin',
      'weapon',
    ],
    'Utility': [
      'links',
      'math',
      'ping',
      //'remindme',
      'server',
      //'user',
    ],
    'Miscellaneous': [
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

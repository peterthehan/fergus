const Config = require('../config.json');

exports.run = (message, args) => {
  const content = '';
  let embed = {};

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

  embed = {
    title: 'Commands',
    fields: Object.keys(cmds).map(currentValue => {
      return {
        name: currentValue,
        value: cmds[currentValue].map(i => Config.prefix + i).join(', ')
      };
    })
  }
  message.channel.sendMessage(content, { embed: embed });
};

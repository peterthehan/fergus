const COMMANDS = {
  'Bot': [
    'help',
    'about',
    'status',
  ],
  'Game': [
    'bread',
    'goddess',
    'hero',
    //'portrait',
    'sbw',
    //'skill',
    'skin',
    'weapon',
  ],
  'Utility': [
    'links',
    'math',
    'ping',
    'remindme',
    'server',
    'user',
  ],
  'Miscellaneous': [
    'fergus',
    'lenny',
    'print',
    'quote',
    'square',
  ],
};

const Config = require('../config.json');

module.exports.run = (message, args) => {
  let msg = '';
  msg += '```';
  Object.keys(COMMANDS).forEach(key =>
    msg += key + ': ' + COMMANDS[key].map(i => Config.prefix + i).join(', ') + '\n'
  );
  msg += '```';
  message.channel.sendMessage(msg);
};

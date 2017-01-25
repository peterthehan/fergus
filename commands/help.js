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
  const embed = require('../util/embed.js').run().setTitle('Commands');
  Object.keys(COMMANDS).forEach((key) => {
    embed.addField(key, COMMANDS[key].map((i) => Config.prefix + i).join(', '));
  });
  message.channel.sendEmbed(embed);
};

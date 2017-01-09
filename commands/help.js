const COMMANDS = {
  'General': [
    'help',
    'about',
    'math',
    'ping',
    'server',
    'status',
    'user',
  ],
  'Game': [
    'bread',
    'goddess',
    'hero',
    'links',
    //'portrait',
    'sbw',
    //'skill',
    'skin',
    'weapon',
  ],
  'Miscellaneous': [
    'fergus',
    'lenny',
    'print',
    'quote',
    'square',
  ],
};

exports.run = function(message, args) {
  let embed = require('../util/embed.js').run().setTitle('Commands');
  Object.keys(COMMANDS).forEach((key) => {
    embed.addField(key, COMMANDS[key].map(i => '!' + i).join(', '));
  });
  message.channel.sendEmbed(embed);
};

const COMMANDS = [
  'help',
  'about',
  'bread',
  'fergus',
  'goddess',
  'hero',
  'lenny',
  'ping',
  'print',
  'sbw',
  //'skill',
  'skin',
  'user',
  'weapon',
];

exports.run = function(message, args) {
  const embed = require('../util/embed.js').run()
    .setTitle('Commands')
    .setDescription(COMMANDS.map(i => '!' + i).join(', '));
  message.channel.sendEmbed(embed);
};

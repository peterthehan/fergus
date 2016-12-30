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
  'quote',
  'sbw',
  //'skill',
  'skin',
  'square',
  'status',
  'user',
  'weapon',
];

exports.run = function(message, args) {
  const embed = require('../util/embed.js').run()
    .setTitle('Commands')
    .setDescription(COMMANDS.map(i => '!' + i).join(', '));
  message.channel.sendEmbed(embed);
};

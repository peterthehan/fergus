const COMMANDS = [
  'help',
  'about',
  'bread',
  'goddess',
  'hero',
  'sbw',
  //'skill',
  'skin',
  'weapon',
  'lenny',
  'fergus',
];

exports.run = function(message, args) {
  const embed = require('../util/embed.js').run()
    .setTitle('Commands')
    .setDescription(COMMANDS.map(i => '!' + i).join(', '));
  message.channel.sendEmbed(embed);
};

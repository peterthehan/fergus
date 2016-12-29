exports.run = function(message, args) {
  const embed = require('../util/embed.js').run()
    .setTitle('Fergus')
    .setDescription('by Peter Han (Saarja)')
    .addField(
      'Special Thanks to',
      'Poiya, fioritura, Fastrail, F1r3man, Protease, Choveck, TheEggCake')
    .addField(
      'Development Server',
      'https://discord.gg/WjEFnzC', true)
    .addField(
      'Official Server',
      'https://discord.gg/6TRnyhj', true)
    .addField(
      'GitHub',
      'https://github.com/Johj/fergus');
  message.channel.sendEmbed(embed);
};

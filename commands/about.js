module.exports.run = (message, args) => {
  const embed = require('../util/embed.js').run()
    .setThumbnail(
      'https://raw.githubusercontent.com/Johj/fergus/master/assets/fergus.png')
    .setTitle('Fergus')
    .setDescription(
      `by ${message.guild.members.get('206161807491072000')} (Saarja)`)
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
      'https://github.com/Johj/fergus')
    .setFooter(
      'This bot is not affiliated, associated, authorized, endorsed by, or in' +
      ' any way officially connected with HANGAME or NHN Entertainment Corp.,' +
      ' or any of their subsidiaries or their affiliates.');
  message.channel.sendEmbed(embed);
};

module.exports.run = (message, args) => {
  const embed = require('../util/embed.js').run()
    .setTitle('Hero/SBW/Skill IRC Tier List')
    .setDescription(
      'https://goo.gl/oNQ2iF\nby jaetheho, Viress, sakai4eva, kamakiller');
  message.channel.sendEmbed(embed);
};

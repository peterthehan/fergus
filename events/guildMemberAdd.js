const config = require('../config.json');
module.exports = (member) => {
  const embed = require('../util/embed.js').run()
    .setDescription(config.welcomePre + member + config.welcomePost);
  member.guild.channels.get(member.guild.id).sendEmbed(embed);
  console.log(
    `${member.user.username}#${member.user.discriminator}: ` +
    `joined ${member.guild.name}`);
};

const config = require('../config.json');
module.exports = (member) => {
  const embed = require('../util/embed.js').run()
    .setDescription(config.farewellPre + member + config.farewellPost);
  member.guild.channels.get(member.guild.id).sendEmbed(embed);
  console.log(
    `${member.user.username}#${member.user.discriminator}: left`);
};

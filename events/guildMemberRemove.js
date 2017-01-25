const Config = require('../config.json');
module.exports = (member) => {
  const embed = require('../util/embed.js').run()
    .setDescription(Config.farewellPre + member + Config.farewellPost);
  member.guild.channels.get(member.guild.id).sendEmbed(embed);
  console.log(
    `${member.user.username}#${member.user.discriminator}: ` +
    `left ${member.guild.name}`);
};

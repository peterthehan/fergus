const config = require('../config.json');

module.exports = (member) => {
  const embed = { description: config.farewellPre + member + ' (' + member.user.tag + ')' + config.farewellPost };
  member.guild.channels.get(member.guild.id).send({ embed: embed });
  console.log(`${member.guild.name}|${member.user.tag}: Left the server`);
};

const config = require('../config.json');

module.exports = (member) => {
  const embed = { description: config.farewellPre + member + config.farewellPost };
  member.guild.channels.get(member.guild.id).send({ embed: embed });
  console.log(`${member.guild.name}|${member.user.tag}: Left the server`);
};

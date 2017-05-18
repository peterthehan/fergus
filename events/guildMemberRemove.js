const config = require('../config.json');
const embed = require('../util/embed.js');

module.exports = (member) => {
  const e = embed.process({
    description:
      `${config.farewellPre}${member} (${member.user.tag})${config.farewellPost}`
  });

  member.guild.channels.get(member.guild.id).send({ embed: e });
  console.log(`${member.guild.name}|${member.user.tag}: Left the server`);
};

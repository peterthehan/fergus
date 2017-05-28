const config = require('../config.json');
const embed = require('../util/embed.js');

module.exports = (member) => {
  const e = embed.process({
    description:
      `${config.welcomePre}${member} (${member.user.tag})${config.welcomePost}`,
  });

  //member.guild.channels.get(member.guild.id).send({ embed: e });
  console.log(`${member.guild.name}|${member.user.tag}: Joined the server`);
};

const config = require('../config.json');

module.exports = (member) => {
  const embed = { description: config.welcomePre + member + ' (' + member.user.tag + ')' + config.welcomePost };
  member.guild.channels.get(member.guild.id).send({ embed: embed });
  console.log(`${member.guild.name}|${member.user.tag}: Joined the server`);
};

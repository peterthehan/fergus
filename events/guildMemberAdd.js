const config = require('../config.json');
module.exports = (member) => {
  member.guild.channels.get(member.guild.id).sendMessage(
    config.welcomePre + member + config.welcomePost);
  console.log(
    `${member.user.username}#${member.user.discriminator}: joined`);
};

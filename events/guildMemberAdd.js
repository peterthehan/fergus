const Config = require('../config.json');
module.exports = (member) => {
  let msg = Config.welcomePre + member + Config.welcomePost;
  member.guild.channels.get(member.guild.id).sendMessage(msg);

  console.log(
    `${member.user.username}#${member.user.discriminator}: ` +
    `joined ${member.guild.name}`);
};

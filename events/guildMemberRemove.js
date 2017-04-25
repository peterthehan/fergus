const Config = require('../config.json');
module.exports = (member) => {
  let msg = Config.farewellPre + member + Config.farewellPost;
  member.guild.channels.get(member.guild.id).sendMessage(msg);

  console.log(
    `${member.user.username}#${member.user.discriminator}: ` +
    `left ${member.guild.name}`);
};

const config = require('../config.json');
module.exports = (member) => {
  member.guild.channels.get(member.guild.id).sendMessage(
    config.farewellPre + member + config.farewellPost);
  console.log(
    `${member.user.username}#${member.user.discriminator}: left`);
};

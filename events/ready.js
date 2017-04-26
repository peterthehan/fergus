const pl = require('../util/determinePlurality.js');

module.exports = (client) => {
  const guilds = client.guilds.size;
  const channels = client.channels.size;
  const users = client.users.size;
  client.user.setGame('!help');
  console.log(
    `${client.user.username}#${client.user.discriminator}: serving ` +
    `${guilds} server${pl.determinePlurality(guilds)}, ` +
    `${channels} channel${pl.determinePlurality(channels)}, and ` +
    `${users} user${pl.determinePlurality(users)}`);
};

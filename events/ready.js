const pl = require('../util/plurality.js');

module.exports = (client) => {
  const guilds = client.guilds.size;
  const channels = client.channels.size;
  const users = client.users.size;
  client.user.setGame('!help');
  console.log(
    `${client.user.username}#${client.user.discriminator}: serving ` +
    `${guilds} server${pl.plurality(guilds)}, ` +
    `${channels} channel${pl.plurality(channels)}, and ` +
    `${users} user${pl.plurality(users)}`);
};

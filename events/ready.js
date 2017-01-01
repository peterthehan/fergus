module.exports = (client) => {
  const guilds = client.guilds.size;
  const channels = client.channels.size;
  const users = client.users.size;
  console.log(
    `${client.user.username}#${client.user.discriminator}: serving ` +
    `${guilds} server${require('../util/getPlurality.js').run(guilds)}, ` +
    `${channels} channel${require('../util/getPlurality.js').run(channels)}, and ` +
    `${users} user${require('../util/getPlurality.js').run(users)}`);
};

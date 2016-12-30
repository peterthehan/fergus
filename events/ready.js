function getPlurality(n) {
  return (n !== 1 ? 's' : '');
}

module.exports = (client) => {
  const guilds = client.guilds.size;
  const channels = client.channels.size;
  const users = client.users.size;
  console.log(
    `${client.user.username}#${client.user.discriminator}: serving ` +
    `${guilds} server${getPlurality(guilds)}, ` +
    `${channels} text channel${getPlurality(channels)}, and ` +
    `${users} user${getPlurality(users)}`);
};

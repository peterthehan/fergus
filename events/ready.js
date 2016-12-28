module.exports = (client) => {
  const guilds = client.guilds.size;
  const channels = client.channels.size;
  const users = client.users.size;

  console.log(
    client.user.username + '#' + client.user.discriminator + ': serving ' +
    guilds + ' server' + (guilds !== 1 ? 's, ' : ', ') +
    channels + ' text channel' + (channels !== 1 ? 's, ' : ', ') + 'and ' +
    users + ' user' + (users !== 1 ? 's' : ''));
};

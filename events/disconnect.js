module.exports = (client) => {
  require('../util/count').resetCount();
  console.error(
    `${client.user.username}#${client.user.discriminator}: disconnected`);
};

const m = require('./message.js');
module.exports = (client) => {
  m.messageCount.resetCount();
  m.commandCount.resetCount();
  console.error(
    `${client.user.username}#${client.user.discriminator}: disconnected`);
};

const Message = require('./message.js');
module.exports = (client) => {
  Message.messageCount.resetCount();
  Message.commandCount.resetCount();
  console.error(
    `${client.user.username}#${client.user.discriminator}: reconnecting`);
};

const Message = require('./message.js');
module.exports = (client) => {
  Message.messageCount.reset();
  Message.commandCount.reset();
  console.error(
    `${client.user.username}#${client.user.discriminator}: reconnecting`);
};

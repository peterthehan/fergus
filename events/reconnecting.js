const message = require('./message.js');

module.exports = (client) => {
  message.messageCount.reset();
  message.commandCount.reset();
  console.log(`${client.user.tag}: Reconnecting`);
};

const msg = require('./message.js');

module.exports = (client) => {
  msg.commandCount.reset();
  msg.messageCount.reset();
  console.log(`${client.user.tag}: Reconnecting`);
};

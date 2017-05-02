const me = require('./message.js');

module.exports = (client) => {
  me.messageCount.reset();
  me.commandCount.reset();
  console.log(`${client.user.tag}: Reconnecting`);
};

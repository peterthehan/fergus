const me = require('./message.js');

module.exports = (client) => {
  me.messageCount.reset(1);
  me.commandCount.reset(1);
  console.log(`${client.user.tag}: Reconnecting`);
};

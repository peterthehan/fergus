const config = require('../config.json');

module.exports = (client) => {
  const prefix = !config.prefix ? `@${client.user.username} ` : config.prefix;
  client.user.setGame(`${prefix}help`);
  console.log(`${client.user.tag}: Ready`);
};

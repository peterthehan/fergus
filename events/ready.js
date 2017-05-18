const config = require('../config.json');

module.exports = (client) => {
  client.user.setGame(config.prefix + 'help');
  console.log(`${client.user.tag}: Ready`);
};

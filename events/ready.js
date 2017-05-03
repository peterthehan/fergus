const config = require('../config.json');
const pl = require('../util/plurality.js');

module.exports = (client) => {
  client.user.setGame(config.prefix + 'help');
  console.log(`${client.user.tag}: Ready`);
};

const pl = require('../util/plurality.js');

module.exports = (client) => {
  client.user.setGame('!help');
  console.log(`${client.user.tag}: Ready`);
};

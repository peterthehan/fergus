const config = require('../config.json');

module.exports = {
  getImagePath: (path) => {
    return `${config.imageURL}${path}${config.imageEXT}`;
  },
  getPrefix: (message) => {
    return !config.prefix ? `@${message.client.user.username} ` : config.prefix;
  },
};

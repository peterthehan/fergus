const config = require('../config.json');

module.exports = {
  id: (id = config.authorId) => id,
  mention: (message, id = config.authorId) => message.client.users.get(id),
};

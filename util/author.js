const config = require('../config.json');

module.exports = {
  id: (id = config.authorId) => id,
  user: (message, id = config.authorId) => message.client.users.get(id),
};

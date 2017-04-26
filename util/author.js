const Config = require('../config.json');

exports.id = (id = Config.authorId) => {
  return id;
}

exports.mention = (message, id = Config.authorId) => {
  return message.client.users.get(id).toString();
}

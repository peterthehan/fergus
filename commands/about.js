const Author = require('../util/author.js');

module.exports.run = (message, args) => {
  const msg =
    'Development Server <https://goo.gl/S03sHT>\n' +
    'Official Server <https://goo.gl/FO7F1E>\n' +
    'GitHub <https://github.com/Johj/fergus>' +
    '```' +
    'This bot is not affiliated, associated, authorized by, endorsed by, or in any way officially connected with HANGAME or NHN Entertainment Corp. or LoadComplete, or any of their subsidiaries or their affiliates.' +
    '```';

  // sending and editing is done to @mention but avoid notification
  message.channel
    .sendMessage('by Peter\n' + msg)
    .then(newMessage => newMessage.edit(`by ${new Author().mention(message)}\n` + msg))
    .catch(error => console.error(error));
};

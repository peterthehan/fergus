const Author = require('../util/author.js');

module.exports.run = (message, args) => {
  message.channel
    // sending and editing is done to @mention but avoid notification
    .sendMessage('fetching...')
    .then(newMessage =>
      newMessage.edit(
        `by ${new Author().mention(message)}\n` +
        'Development Server <https://goo.gl/S03sHT>\n' +
        'Official Server <https://goo.gl/FO7F1E>\n' +
        'GitHub <https://github.com/Johj/fergus>\n\n' +
        'This bot is not affiliated, associated, authorized by, endorsed by, or in any way officially connected with HANGAME or NHN Entertainment Corp. or LoadComplete, or any of their subsidiaries or their affiliates.'
      )
    )
    .catch(error => console.error(error));
};

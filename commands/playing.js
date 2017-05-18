const author = require('../util/author.js');
const embed = require('../util/embed.js');

playing = (message, args) => {
  message.client.user.setGame(args.join(' '))
    .then(console.log('Playing state has been changed.'))
    .catch(error => console.log(error));
}

exports.run = (message, args) => {
  const isAuthor = message.author.id === author.id();
  if (isAuthor) {
    playing(message, args);
  } else {
    const e = embed.process({ title: 'Error', description: 'Access denied.', });
    message.channel.send({ embed: e, });
  }

  return isAuthor;
}

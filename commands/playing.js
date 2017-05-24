const author = require('../util/author.js');
const embed = require('../util/embed.js');

playing = (message, args) => {
  const game = args.join(' ');
  const msg = !game ? 'Playing nothing.' : `Now playing: '${game}'`;
  message.client.user.setGame(game)
    .then(console.log(msg))
    .catch(error => console.log(error));

  return embed.process({ description: msg, });
}

exports.run = (message, args) => {
  const isAuthor = message.author.id === author.id();
  const e = isAuthor
    ? playing(message, args)
    : embed.process({ title: 'Error', description: 'Access denied.', });

  message.channel.send({ embed: e, });
  return isAuthor;
}

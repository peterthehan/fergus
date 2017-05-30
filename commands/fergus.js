const embed = require('../util/embed.js');

exports.run = (message, args) => {
  const e = embed.process({ image: { url: message.client.user.avatarURL, }, });

  message.channel.send({ embed: e, });
}

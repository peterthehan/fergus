const embed = require('../util/embed.js');

exports.run = (message, args) => {
  const e = embed.process({
    image: {
      url: 'https://raw.githubusercontent.com/Johj/fergus/master/assets/fergus.png',
    },
  });

  message.channel.send({ embed: e, });
  return true;
}

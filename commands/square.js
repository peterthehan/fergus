const embed = require('../util/embed.js');

square = (str) => {
  let description = '```';
  if (str.length === 1) {
    description += str;
  } else {
    description += str.split('').join(' ') + '\n';
    if (str.length > 2) {
      for (let i = 1; i < str.length - 1; ++i) {
        description +=
          str.charAt(i) +
          ' '.repeat((str.length * 2) - 1 - 2) +
          str.charAt(str.length - i - 1) + '\n';
      }
    }
    description += str.split('').reverse().join(' ');
  }
  description += '```';

  return embed.process({ description: description, });
}

exports.run = (message, args) => {
  let e = {};
  if (args.length === 0) {
    e = embed.process({ description: 'Type something to squarify!', });
  } else {
    const str = args.join(' ');
    e = str.length <= 16
        ? square(str)
        : embed.process({
            title: 'Error',
            description: 'Message is too long!',
          });
  }

  message.channel.send({ embed: e, });
  return true;
}

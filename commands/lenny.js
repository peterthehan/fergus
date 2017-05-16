const bounds = require('../util/bounds.js');
const embed = require('../util/embed.js');
const repeat = require('../util/repeat.js');

lenny = () => {
  return '( ͡° ͜ʖ ͡°)';
}

exports.run = (message, args) => {
  const times = args.length > 0 && !isNaN(args[0])
      ? bounds([1, 10, parseInt(args[0])])
      : 1;

  const e = embed.process({ description: repeat(times, lenny).join(' ') });

  message.channel.send({ embed: e, });
  return true;
}

const bounds = require('../util/bounds.js');
const repeat = require('../util/repeat.js');

lenny = () => '( ͡° ͜ʖ ͡°)';

exports.run = (message, args) => {
  const times = args.length > 0 && !isNaN(parseInt(args[0]))
    ? bounds([1, 10, parseInt(args[0])])
    : 1;
  const embed = { description: repeat(times, lenny).join(' ') };
  message.channel.send({ embed: embed });
  return true;
};

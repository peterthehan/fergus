const bounds = require('../util/bounds.js');
const countInstances = require('../util/countInstances.js');
const embed = require('../util/embed.js');
const random = require('../util/random.js');
const repeat = require('../util/repeat.js');

flip = () => {
  return random(0, 1) === 0 ? 'Heads' : 'Tails';
}

exports.run = (message, args) => {
  const times = args.length > 0 && !isNaN(args[0])
      ? bounds([1, 100, parseInt(args[0])])
      : 1;
  const flips = repeat(times, flip).join(' ');
  const countHeads = countInstances(flips, 'Heads');
  const title = times > 1
      ? `Heads: ${countHeads}, Tails: ${times - countHeads}`
      : '';

  const e = embed.process({ title: title, description: flips, });

  message.channel.send({ embed: e, });
  return true;
}

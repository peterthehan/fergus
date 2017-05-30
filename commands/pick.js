const embed = require('../util/embed.js');
const random = require('../util/random.js');

pickInstructions = () => {
  const names = ['<list>',];
  const values = [
    'Randomly pick one item from a comma-separated list.\n' +
      '*e.g. !pick milk, bread, eggs*',
  ];
  const inlines = [true,];

  return embed.process({
    title: '!pick [<list>]',
    fields: embed.fields(names, values, inlines),
  });
}

pickItem = (args) => {
  const list = args.join(' ').split(',');
  return embed.process({
    title: 'I pick...',
    description: list[random(0, list.length - 1)] + '!',
  });
}

exports.run = (message, args) => {
  const e = !args.length ? pickInstructions() : pickItem(args);

  message.channel.send({ embed: e, });
}

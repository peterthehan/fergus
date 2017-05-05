const random = require('../util/random.js');

pickInstructions = () => {
  return {
    title: '!pick [<list>]',
    fields: [
      {
        name: '<list>',
        value: 'Randomly choose one item from a comma-separated list.\n*e.g. !pick milk, bread, eggs*',
        inline: true
      }
    ]
  };
}

pickItem = (args) => {
  const list = args.join(' ').split(',');
  return { title: 'I pick...', description: list[random(0, list.length - 1)] + '!' };
}

exports.run = (message, args) => {
  const embed = args.length === 0
    ? pickInstructions()
    : pickItem(args);
  message.channel.send({ embed: embed });
  return true;
};

const embed = require('../util/embed.js');
const random = require('../util/random.js');

mockInstructions = () => {
  const names = ['<text>',];
  const values = ['Mockify <text>.\n*e.g. !mock hello world*',];
  const inlines = [true,];

  return embed.process({
    title: ['!mock [<text>]'].map(i => mock(i))[0],
    fields: embed.fields(
      names.map(i => mock(i)),
      values.map(i => mock(i)),
      inlines
    ),
  });
}

mockMessage = (args) => {
  return embed.process({
    description: mock(args.join(' ')),
    thumbnail: {
      url: 'https://raw.githubusercontent.com/Johj/fergus/master/assets/mock.png',
    },
  });
}

// helper function
mock = (string) => {
  const parity = random(0, 1);
  return string
    .split('')
    .map((currentValue, index) => {
      return index % 2 === parity
        ? currentValue.toLowerCase()
        : currentValue.toUpperCase();
    })
    .join('');
}

exports.run = (message, args) => {
  const e = !args.length ? mockInstructions() : mockMessage(args);

  message.channel.send({ embed: e, });
  return true;
}

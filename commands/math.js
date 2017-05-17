const math = require('mathjs');
const embed = require('../util/embed.js');

mathInstructions = () => {
  const names = ['<expression>', '\u200b',];
  const values = [
    'Resolve <expression>.\n*e.g. !math 2 + 2*',
    'Examples can be found at http://mathjs.org/.',
  ];
  const inlines = [true, false,];

  return embed.process({
    title: '!math [<expression>]',
    fields: embed.fields(names, values, inlines),
  });
}

exports.run = (message, args) => {
  let e;
  if (!args.length) {
    e = mathInstructions();
  } else {
    try {
      e = embed.process({ description: math.eval(args.join(' ')).toString(), });
    } catch (error) {
      e = embed.process({ description: error.toString(), });
      console.log(error);
    }
  }

  message.channel.send({ embed: e, });
  return true;
}

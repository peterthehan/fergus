const math = require('mathjs');

mathInstructions = () => {
  return {
    title: '!math [<expression>]',
    fields: [
      {
        name: '<expression>',
        value: 'Resolve <expression>.\n*e.g. !math 2 + 2*',
        inline: true
      },
      {
        name: '\u200b',
        value: 'Examples can be found at http://mathjs.org/.',
        inline: false
      }
    ]
  };
}

exports.run = (message, args) => {
  let embed = {};

  if (args.length === 0) {
    embed = mathInstructions();
  } else {
    try {
      embed = { description: math.eval(args.join(' ')).toString() };
    } catch (error) {
      embed = { description: error.toString() };
      console.log(error);
    }
  }
  message.channel.send({ embed: embed });
  return true;
};

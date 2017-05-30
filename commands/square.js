const embed = require('../util/embed.js');

squareInstructions = () => {
  const names = ['<text>',];
  const values = ['Squarify <text>.\n*e.g. !square hello world*',];
  const inlines = [true,];

  return embed.process({
    title: '!square [<text>]',
    fields: embed.fields(names, values, inlines),
  });
}

squareMessage = (args) => {
  const text = args.join(' ');
  if (text.length >= 32) {
    return embed.process({
      title: 'Error',
      description:
        `${text} is not a valid <text> parameter! ` +
        `<text> must be less than 32 characters.`,
    });
  }

  return embed.process({ description: square(text), });
}

// helper function
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

  return description;
}

exports.run = (message, args) => {
  const e = !args.length ? squareInstructions() : squareMessage(args);

  message.channel.send({ embed: e, });
}

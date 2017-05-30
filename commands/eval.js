const beautify = require('js-beautify').js_beautify;
const author = require('../util/author.js');
const embed = require('../util/embed.js');
const timestamp = require('../util/timestamp.js');

evaluate = (message, args) => {
  if (!args.length) {
    return embed.process({ description: 'Type code!', });
  }

  let input = args.join(' ');
  if (input.toLowerCase().includes('token')
    || input.toLowerCase().includes('eval')
  ) {
    return embed.process({ description: 'This is a bad idea.', });
  }

  input = beautify(input, { indent_size: 2, });
  let output;
  try {
    output = eval(input);
  } catch (error) {
    output = error;
  }

  const names = ['Input', 'Output',];
  const values = ['```js\n' + input + '```', '```\n' + output + '```',];
  const inlines = [false, false,];

  return embed.process({
    footer: { text: timestamp(message.createdAt), },
    fields: embed.fields(names, values, inlines),
  });
}

exports.run = (message, args) => {
  const e = message.author.id === author.id()
    ? evaluate(message, args)
    : embed.process({ title: 'Error', description: 'Access denied.', });

  message.channel.send({ embed: e, });
}

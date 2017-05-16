const beautify = require('js-beautify').js_beautify;
const author = require('../util/author.js');
const embed = require('../util/embed.js');
const timestamp = require('../util/timestamp.js');

evaluate = (message, args) => {
  // limit command to author because eval is evil
  if (message.author.id === author.id()) {
    if (args.length > 0) {
      let input = args.join(' ');
      if (input.includes('token') || input.includes('eval')) {
        return embed('This is a bad idea.', '');
      } else {
        input = beautify(input, { indent_size: 2 });
        let output;
        try {
          output = eval(input);
        } catch (error) {
          output = error;
        }

        const names = ['Input', 'Output',];
        const values = [
          '```js\n' + input + '```',
          '```js\n' + output + '```',
        ];
        const inlines = [false, false,];

        return embed.process({
          footer: { text: timestamp(message.createdAt), },
          fields: embed.fields(names, values, inlines),
        });
      }
    }
    return embed.process({ description: 'Type code!' });
  }
  return embed.process({ title: 'Error', description: 'Access denied.', });
}

exports.run = (message, args) => {
  const e = evaluate(message, args);

  message.channel.send({ embed: e, });
  return true;
}

const beautify = require('js-beautify').js_beautify;
const author = require('../util/author.js');

exports.run = (message, args) => {
  let content = '';

  // limit command to author because eval is evil
  if (message.author.id === author.id()) {
    if (args.length > 0) {
      let input = args.join(' ');

      if (input.includes('token') || input.includes('eval')) {
        content = 'This is a bad idea.';
      } else {
        input = beautify(input, { indent_size: 2 });
        let output = '';
        try {
          output = eval(input);
        } catch (error) {
          output = error;
        }

        content =
          '```js\nInput\n' + input + '```' +
          '```js\nOutput\n' + output + '```';
      }
    }
  } else {
    content = 'Access denied.';
    console.log(content);
  }

  message.channel.send(content);
};

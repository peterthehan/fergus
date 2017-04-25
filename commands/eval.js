const beautify = require('js-beautify').js_beautify;
const Author = require('../util/author.js');

module.exports.run = (message, args) => {
  let msg = '';

  // limit command to author because eval is evil
  if (message.author.id === new Author().toString()) {
    if (args.length > 1) {
      let input = args.slice(1).join(' ');

      if (input.includes('token')) {
        msg = 'This is a bad idea.';
      } else {
        input = beautify(input, { indent_size: 2 });
        let output = '';

        try {
          output = eval(input);
        } catch (error) {
          output = error;
          console.error(error);
        }

        msg =
          '```js\nInput\n' + input + '```' +
          '```js\nOutput\n' + output + '```';
      }
    }
  } else {
    msg = 'Access denied.';
    console.error(msg);
  }
  message.channel.sendMessage(msg);
};

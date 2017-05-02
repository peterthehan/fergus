const math = require('mathjs');

exports.run = (message, args) => {
  let content = '';

  if (args.length === 0) {
    content = 'Examples can be found here: http://mathjs.org/';
  } else {
    try {
      content = math.eval(args.join(' ')).toString();
    } catch (error) {
      content = error;
      console.log(error);
    }
  }
  message.channel.send(content);
  return true;
};

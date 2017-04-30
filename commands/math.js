const math = require('mathjs');

exports.run = (message, args) => {
  let content = '';
  const embed = {};

  if (args.length === 0) {
    content = 'Examples can be found here: http://mathjs.org/';
  } else {
    try {
      content = math.eval(args.join(' ')).toString();
    } catch (error) {
      content = error;
      console.error(error);
    }
  }
  message.channel.sendMessage(content, { embed: embed });
};

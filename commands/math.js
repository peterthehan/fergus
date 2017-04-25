const math = require('mathjs');

module.exports.run = (message, args) => {
  let msg = '';

  if (args.length === 1) {
    msg = 'Examples can be found here: http://mathjs.org/';
  } else {
    try {
      msg = math.eval(args.slice(1).join(' ')).toString();
    } catch (error) {
      msg = error;
      console.error(error);
    }
  }
  message.channel.sendMessage(msg);
};

exports.run = function(message, args) {
  if (args.length > 1) {
    let str = '```';

    if (args[1].length === 1) {
      str += args[1];
    } else if (args[1].length === 2) {
      str += args[1].split('').join(' ') + '\n';
      str += args[1].split('').reverse().join(' ');
    } else {
      str += args[1].split('').join(' ') + '\n';
      for (let i = 1; i < args[1].length - 1; ++i) {
        str +=
          args[1].charAt(i) +
          ' '.repeat((args[1].length * 2) - 1 - 2) +
          args[1].charAt(args[1].length - i - 1) + '\n';
      }
      str += args[1].split('').reverse().join(' ');
    }
    str += '```';

  	const embed = require('../util/embed.js').run()
      .setDescription(str);
    message.channel.sendEmbed(embed);
  }
};

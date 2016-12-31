function getSquare(str) {
  let ret = '```';
  if (str.length === 1) {
    ret += str;
  } else {
    ret += str.split('').join(' ') + '\n';
    if (str.length > 2) {
      for (let i = 1; i < str.length - 1; ++i) {
        ret +=
          str.charAt(i) +
          ' '.repeat((str.length * 2) - 1 - 2) +
          str.charAt(str.length - i - 1) + '\n';
      }
    }
    ret += str.split('').reverse().join(' ');
  }
  ret += '```';

  const embed = require('../util/embed.js').run()
    .setDescription(ret);
  return embed;
}

exports.run = function(message, args) {
  let embed;
  if (args.length === 1) {
    embed = require('../util/embed.js').run()
      .setDescription('Type something!');
  } else {
    if (args[1].length <= 16) {
      embed = getSquare(args[1]);
    } else {
      embed = require('../util/getError.js')
        .run(args[1], 16, ' is too long of a message!');
    }
  }
  message.channel.sendEmbed(embed);
};

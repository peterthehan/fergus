module.exports.run = (message, args) => {
  let expression = args.join(' ').slice(args[0].length + 1);
  expression = expression.replace(/[^-()\d/*+.e%]/g, '');

  const embed = require('../util/embed.js').run()
    .setDescription(new Function('return ' + expression)());
  message.channel.sendEmbed(embed);
};

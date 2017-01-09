const math = require('mathjs');
module.exports.run = (message, args) => {
  let expression = args.slice(1).join(' ');

  const embed = require('../util/embed.js').run()
    .setDescription(math.eval(expression));
  message.channel.sendEmbed(embed);
};

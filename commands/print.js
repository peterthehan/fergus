exports.run = function(message, args) {
  if (args.length > 1) {
    message.delete();
    const embed = require('../util/embed.js').run()
      .setDescription(args.join(' ').slice(args[0].length));
    message.channel.sendEmbed(embed);
  }
};

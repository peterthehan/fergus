exports.run = function(message, args) {
  message.delete();
  let embed = require('../util/embed.js').run();
  if (args.length === 1) {
    embed.setDescription('Type something!');
  } else {
    embed.setDescription(args.join(' ').slice(args[0].length));
  }
  message.channel.sendEmbed(embed);
};

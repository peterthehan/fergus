module.exports.run = (message, args) => {
  const embed = require('../util/embed.js').run();
  if (args.length === 1) {
    embed.setDescription('Type something!');
  } else {
    message.delete();
    embed.setDescription(args.slice(1).join(' '));
  }
  message.channel.sendEmbed(embed);
};

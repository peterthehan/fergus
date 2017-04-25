const moment = require('moment');

module.exports.run = (message, args) => {
  const embed = require('../util/embed.js').run();
  if (args.length === 1) {
    embed.setDescription('Type something!');
  } else {
    message.delete();
    embed
      .setAuthor(
        `${message.author.username}#${message.author.discriminator}`,
        message.author.avatarURL)
      .setDescription(args.slice(1).join(' '))
      .setFooter(moment(message.createdAt).format('ddd MMM Do, YYYY [at] HH:mm:ss'));
  }
  message.channel.sendEmbed(embed);
};

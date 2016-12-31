exports.run = function(message, args) {
  let embed = require('../util/embed.js').run();
  if (args.length === 1) {
    embed.setDescription('Type something!');
  } else {
    message.delete();
    embed
      .setAuthor(
        `${message.author.username}#${message.author.discriminator}`,
        message.author.avatarURL)
      .setDescription(args.join(' ').slice(args[0].length))
      .setTimestamp(message.createdAt);
  }
  message.channel.sendEmbed(embed);
};

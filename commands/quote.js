exports.run = function(message, args) {
  if (args.length > 1) {
    message.delete();
    const embed = require('../util/embed.js').run()
      .setAuthor(
        `${message.author.username}#${message.author.discriminator}`,
        message.author.avatarURL)
      .setDescription(args.join(' ').slice(args[0].length))
      .setFooter(message.createdAt.toString());
    message.channel.sendEmbed(embed);
  }
};

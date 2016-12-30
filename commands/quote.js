exports.run = function(message, args) {
  message.delete();
  let embed = require('../util/embed.js').run();
  if (args.length === 1) {
    embed.setDescription('Type something!');
  } else {
    embed
      .setAuthor(
        `${message.author.username}#${message.author.discriminator}`,
        message.author.avatarURL)
      .setDescription(args.join(' ').slice(args[0].length))
      .setFooter(message.createdAt.toString());
  }
  message.channel.sendEmbed(embed);
};

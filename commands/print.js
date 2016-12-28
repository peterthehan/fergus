exports.run = function(message, args) {
  message.delete();
  const embed = require('../util/embed.js').run()
    .setDescription(args.join(' ').slice(7))
    .setFooter(`${message.author.username}#${message.author.discriminator}`);
  message.channel.sendEmbed(embed);
};

exports.run = function(message, args) {
  const embed = require('../util/embed.js').run()
    .setDescription(`pong`);
  message.channel.sendEmbed(embed);
};

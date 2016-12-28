exports.run = function(message, args) {
  message.delete();
  const embed = require('../util/embed.js').run()
    .setImage('https://raw.githubusercontent.com/Johj/fergus/master/assets/fergus.png');
    message.channel.sendEmbed(embed);
};

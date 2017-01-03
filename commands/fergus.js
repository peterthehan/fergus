module.exports.run = (message, args) => {
  const embed = require('../util/embed.js').run()
    .setImage('https://raw.githubusercontent.com/Johj/fergus/master/assets/fergus.png');
  message.channel.sendEmbed(embed);
};

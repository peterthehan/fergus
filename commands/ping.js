exports.run = function(message, args) {
  let embed = require('../util/embed.js').run()
    .setDescription('pinging...');
  message.channel.sendEmbed(embed)
    .then(newMessage => {
      embed.setDescription(
        'pong! ' +
        (newMessage.createdTimestamp - message.createdTimestamp) + ' ms');
      newMessage.edit('', {embed});
    });
};

module.exports.run = (message, args) => {
  const embed = require('../util/embed.js').run()
    .setDescription('pinging...');
  message.channel.sendEmbed(embed)
    .then(newMessage => {
      embed
        .setDescription(
          'pong! ' +
          `ws: ${Math.round(message.client.ping)} ms, ` +
          `http: ${newMessage.createdTimestamp - message.createdTimestamp} ms`);
      newMessage.edit('', {embed});
    });
};

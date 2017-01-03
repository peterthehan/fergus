module.exports.run = (message, args) => {
  let embed = require('../util/embed.js').run()
    .setDescription(`pong! ${Math.round(message.client.ping)} ms`);
  message.channel.sendEmbed(embed);
};

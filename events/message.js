const config = require('../config.json');

const Count = require('../util/count.js');
const commandCount = new Count(1);
const messageCount = new Count(1);

module.exports = {
  message: (message) => {
    messageCount.increment();
    if (!message.content.startsWith(config.prefix) || message.author.bot)
      return;

    const log = (message.channel.type === 'text'
      ? `${message.guild.name}#${message.channel.name}`
      : message.channel.type) + `|${message.author.tag}: ${message.content}`;
    console.log(log);

    const args = message.content.split(' '); // only includes arguments
    const command = args.shift().slice(config.prefix.length).toLowerCase();

    let commandSuccess = false;
    try {
      commandSuccess = require(`../commands/${command}`).run(message, args);
    } catch (error) {
      console.log(error);
    }
    if (commandSuccess) {
      commandCount.increment();
    }
  },
  commandCount,
  messageCount,
};

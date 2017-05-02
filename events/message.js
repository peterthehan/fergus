const config = require('../config.json');

const Count = require('../util/count.js');
const messageCount = new Count();
const commandCount = new Count();

module.exports = {
  message: (message) => {
    messageCount.increment();
    if (!message.content.startsWith(config.prefix) || message.author.bot)
      return;

    console.log(`${message.guild.name}#${message.channel.name}|${message.author.tag}: ${message.content}`);

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
  messageCount,
  commandCount,
};

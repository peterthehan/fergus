const Config = require('../config.json');
const Count = require('../util/count.js');
const output = require('../util/output.js');

const messageCount = new Count();
const commandCount = new Count();

module.exports = {
  message: message => {
    messageCount.increment();
    if (!message.content.startsWith(Config.prefix) || message.author.bot)
      return;

    output.run(message); // console.log

    const args = message.content.split(' ');
    args[0].toLowerCase(); // case-insensitive
    const command = args[0].slice(Config.prefix.length);

    try {
      commandCount.increment();
      require(`../commands/${command}`).run(message, args);
    } catch (error) {
      console.error(error);
    }
  },
  messageCount,
  commandCount,
};

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
    const command = args.shift().slice(Config.prefix.length).toLowerCase();

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

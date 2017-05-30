const config = require('../config.json');

const Count = require('../util/count.js');
const commandCount = new Count();
const messageCount = new Count();

module.exports = {
  message: (message) => {
    // count all messages
    messageCount.increment(message, 'message');

    // check if message is a command
    const isInvalidPrefix = !message.content.startsWith(config.prefix)
      && !RegExp(`^<@!?${message.client.user.id}>`).test(message.content);
    if (message.author.bot || isInvalidPrefix) {
      return;
    }

    // parse message into command and arguments
    const args = message.content.split(' ');
    let command;
    if (message.content.startsWith(config.prefix)) {
      command = args.shift().slice(config.prefix.length).toLowerCase();
    } else {
      args.shift(); // remove bot mention
      command = args.shift().toLowerCase();
    }

    // check if command file exists
    let isValidCommand = true;
    try {
      require(`../commands/${command}`);
    } catch (error) {
      isValidCommand = false;
      console.log(`${error.name}: ${error.message}`);
    }

    if (isValidCommand) {
      // command logging
      const messageLocation = message.channel.type === 'text'
        ? `${message.guild.name}#${message.channel.name}`
        : message.channel.type;
      console.log(
        `${messageLocation}|${message.author.tag}: ${message.content}`
      );

      // count command
      commandCount.increment(message, command);

      // execute command
      require(`../commands/${command}`).run(message, args);
    }
  },
  commandCount,
  messageCount,
};

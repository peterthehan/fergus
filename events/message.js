const Config = require('../config.json');
let Count = require('../util/count.js');
let messageCount = new Count();
let commandCount = new Count();
module.exports = {
  message: (message) => {
    messageCount.incrementCount();
    if (!message.content.startsWith(Config.prefix) || message.author.bot) return;

    console.log(
      `${message.author.username}#${message.author.discriminator}: ` +
      `(${message.guild.name}/#${message.channel.name}) ${message.content}`);

    let args = message.content.split(' ');
    args[0].toLowerCase(); // case-insensitive
    const command = args[0].slice(Config.prefix.length);
    try {
      commandCount.incrementCount();
      const commandFile = require(`../commands/${command}`);
      commandFile.run(message, args);
    } catch (error) {
      console.error(`${error.name}: ${error.message}`);
    }
  },
  messageCount,
  commandCount
};

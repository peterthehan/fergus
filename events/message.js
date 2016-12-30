const config = require('../config.json');
const prefix = config.prefix;
let count = require('../util/count.js');
module.exports = (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  console.log(
    `${message.author.username}#${message.author.discriminator}: ` +
    `(${message.guild.name}/#${message.channel.name}) ${message.content}`);

  let args = message.content.split(' ');
  args[0].toLowerCase(); // case-insensitive
  const command = args[0].slice(prefix.length);
  try {
    const commandFile = require(`../commands/${command}`);
    commandFile.run(message, args);
    count.incrementCount();
  } catch (error) {
    console.error(`${error.name}: ${error.message}`);
  }
};

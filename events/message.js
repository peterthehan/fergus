const config = require('../config.json');
const prefix = config.prefix;
module.exports = (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const msg = message.content.toLowerCase(); // case-insensitive
  const args = msg.split(' ');
  const command = args[0].slice(prefix.length);
  console.log(
    `${message.author.username}#${message.author.discriminator}: ${msg}`);
  try {
    const commandFile = require(`../commands/${command}`);
    commandFile.run(message, args);
  } catch (error) {
    console.error(`${error.name}: ${error.message}`);
  }
};

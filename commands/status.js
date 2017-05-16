const humanizeDuration = require('humanize-duration');
const me = require('../events/message.js');
const embed = require('../util/embed.js');
const plurality = require('../util/plurality.js');
const timestamp = require('../util/timestamp.js');

exports.run = (message, args) => {
  const heapUsed = Math.round(process.memoryUsage().heapUsed / (1024 * 1024));
  const heapTotal =
      Math.round(process.memoryUsage().heapTotal / (1024 * 1024));

  // parallel arrays
  const names = [
    `Serving`,
    'Session uptime',
    'Process heap usage',
    'Commands this session',
    'Messages this session',
  ];
  const values = [
    `${message.client.guilds.size} ` +
        `server${plurality(message.client.guilds.size)}, ` +
        `${message.client.channels.size} ` +
        `channel${plurality(message.client.channels.size)}, and ` +
        `${message.client.users.size} ` +
        `user${plurality(message.client.users.size)}`,
    humanizeDuration(message.client.uptime),
    `${heapUsed} MB of ${heapTotal} MB ` +
        `(${(100 * heapUsed / heapTotal).toFixed(2)}%)`,
    me.commandCount.toString(),
    me.messageCount.toString(),
  ];
  const inlines = [false, false, false, true, true,];

  const e = embed.process({
    footer: { text: timestamp(message.createdAt), },
    fields: values.map((currentValue, index) => {
      return {
        name: names[index],
        value: currentValue,
        inline: inlines[index],
      };
    }),
  });

  message.channel.send({ embed: e, });
  return true;
}

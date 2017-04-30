const moment = require('moment');
const m = require('../events/message.js');
const pl = require('../util/plurality.js');

getTime = (ms) => {
  const date = new Date(ms);
  const days = date.getUTCDate() - 1;
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  const seconds = date.getUTCSeconds();
  const times = [days, hours, minutes, seconds];
  const strings = ['day', 'hour', 'minute', 'second'];

  let index = times.findIndex(i => i !== 0);
  if (index === -1) {
    index = times.length - 1;
  }

  let str = '';
  for (i = index; i < strings.length; ++i) {
    str += `${times[i]} ${strings[i]}${times[i] !== 1 ? 's ' : ' '}`
  }
  return str;
}

exports.run = (message, args) => {
  const content = '';
  let embed = {};

  const guilds = message.client.guilds.size;
  const channels = message.client.channels.size;
  const users = message.client.users.size;
  const heapUsed = Math.round(process.memoryUsage().heapUsed / (1024 * 1024));
  const heapTotal = Math.round(process.memoryUsage().heapTotal / (1024 * 1024));

  // parallel arrays
  const names = [
    `Serving`,
    'Session uptime',
    'Process heap usage',
    'Commands this session',
    'Messages this session'
  ];
  const values = [
    `${guilds} server${pl.plurality(guilds)}, ` +
      `${channels} channel${pl.plurality(channels)}, and ` +
      `${users} user${pl.plurality(users)}`,
    getTime(message.client.uptime),
    `${heapUsed} MB of ${heapTotal} MB (${(100 * heapUsed / heapTotal).toFixed(2)}%)`,
    m.commandCount.toString(),
    m.messageCount.toString()
  ];
  const inlines = [true, true, false, true, true];

  embed = {
    fields: values.map((currentValue, index) => {
      return {
        name: names[index],
        value: currentValue,
        inline: inlines[index]
      };
    }),
    footer: {
      text: moment(message.createdAt).format('ddd MMM Do, YYYY [at] HH:mm:ss')
    }
  };
  message.channel.sendMessage(content, { embed: embed });
};

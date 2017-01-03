function getTime(ms) {
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

const moment = require('moment');
const m = require('../events/message.js');
exports.run = function(message, args) {
  const guilds = message.client.guilds.size;
  const channels = message.client.channels.size;
  const users = message.client.users.size;

  const heapUsed = Math.round(process.memoryUsage().heapUsed / 1024 / 1024);
  const heapTotal = Math.round(process.memoryUsage().heapTotal / 1024 / 1024);
  const embed = require('../util/embed.js').run()
    .addField(
      `Serving`,
      `${guilds} server${require('../util/getPlurality.js').run(guilds)}, ` +
      `${channels} channel${require('../util/getPlurality.js').run(channels)}, and ` +
      `${users} user${require('../util/getPlurality.js').run(users)}`)
    .addField('Session Uptime', getTime(message.client.uptime), true)
    .addField(
      'Process Heap Usage',
      `${heapUsed} MB of ${heapTotal} MB (${(100 * heapUsed / heapTotal).toFixed(2)}%)`,
      true)
    .addField('Commands this Session', m.commandCount.getCount())
    .addField('Messages this Session', m.messageCount.getCount())
    .setFooter(moment(message.createdAt).format('ddd MMM Do, YYYY [at] HH:mm:ss'));
  message.channel.sendEmbed(embed);
};

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

exports.run = function(message, args) {
  const guilds = message.client.guilds.size;
  const channels = message.client.channels.size;
  const users = message.client.users.size;

  const embed = require('../util/embed.js').run()
    .addField(
      `Serving`,
      `${guilds} server${require('../util/getPlurality.js').run(guilds)}, ` +
      `${channels} text channel${require('../util/getPlurality.js').run(channels)}, and ` +
      `${users} user${require('../util/getPlurality.js').run(users)}`)
    .addField('Uptime', getTime(message.client.uptime), true)
    .addField(
      'Memory Usage',
      `${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)} MB`,
      true)
    .addField('Commands this Session', require('../util/count').getCount());
  message.channel.sendEmbed(embed);
};

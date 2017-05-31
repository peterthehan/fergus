const humanizeDuration = require('humanize-duration');
const msg = require('../events/message.js');
const author = require('../util/author.js');
const embed = require('../util/embed.js');
const removeDuplicates = require('../util/removeDuplicates.js');
const timestamp = require('../util/timestamp.js');

channelDetail = (message) => {
  const channelObj = {};
  message.client.channels.array().forEach(currentValue => {
    if (!channelObj[currentValue.type]) {
      channelObj[currentValue.type] = 0;
    }
    ++channelObj[currentValue.type];
  });

  return `${message.client.channels.size} total\n` + Object
    .keys(channelObj)
    .sort((a, b) => channelObj[b] - channelObj[a])
    .map(i => `${channelObj[i]} ${i}`)
    .join('\n');
}

userDetail = (message) => {
  const usersTotal = message.client.guilds
    .map(currentValue => currentValue.memberCount)
    .reduce(((accumulator, currentValue) => accumulator + currentValue), 0);

  const usersOnline = message.client.guilds
    .map(currentValue => {
      return currentValue.members
        .filter(element => element.presence.status === 'online');
    })
    .map(currentValue => currentValue.size)
    .reduce(((accumulator, currentValue) => accumulator + currentValue), 0);

  const usersUnique = removeDuplicates(
    message.client.guilds
      .map(currentValue => currentValue.members.map(i => i.id))
      .reduce(((a, b) => a.concat(b)), [])
    ).length;

  const usersUniqueOnline = removeDuplicates(
    message.client.guilds
      .map(currentValue => {
        return currentValue.members
          .filter(element => element.presence.status === 'online')
          .map(i => i.id)
      })
      .reduce(((a, b) => a.concat(b)), [])
    ).length;

  return `${usersTotal} total\n` +
    `${usersOnline} online\n` +
    `${usersUnique} unique total\n` +
    `${usersUniqueOnline} unique online`;
}

processDetail = () => {
  const n = 1024 * 1024;
  const heapUsed = Math.round(process.memoryUsage().heapUsed / n);
  const heapTotal = Math.round(process.memoryUsage().heapTotal / n);

  return `${heapUsed} of ${heapTotal} MB\n` +
    `(${(100 * heapUsed / heapTotal).toFixed(2)}%)`;
}

countDetail = (message, count) => {
  return `${count}\n(${(count / message.client.uptime * 1000 * 60).toFixed(2)}/min)`;
}

exports.run = (message, args) => {
  const names = [
    'Servers',
    'Channels',
    'Users',
    'Session uptime',
    'Process heap usage',
    'Websocket ping',
    'Command frequency',
    'Commands run',
    'Messages read',
  ];
  const values = [
    message.client.guilds.size,
    channelDetail(message),
    userDetail(message),
    humanizeDuration(message.client.uptime).split(', ').join('\n'),
    processDetail(),
    `${Math.round(message.client.ping)} ms`,
    msg.commandCount.commandFrequency(3),
    countDetail(message, msg.commandCount.sum()),
    countDetail(message, msg.messageCount.sum()),
  ];
  const inlines = [true, true, true, true, true, true, true, true, true,];

  const e = embed.process({
    description: 'Made with ❤ by ' +
      `${author.user(message)} (${author.user(message).tag}).`,
    footer: { text: timestamp(message.createdAt), },
    author: {
      name: message.client.user.username,
      icon_url: message.client.user.avatarURL,
    },
    fields: embed.fields(names, values, inlines),
  });

  message.channel.send({ embed: e, });
}

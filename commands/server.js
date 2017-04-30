const moment = require('moment');
const pl = require('../util/plurality.js');
const tr = require('../util/truncateString.js');

getChannels = (guild) => {
  const textChannel = [];
  const voiceChannel = [];
  guild.channels
    .map(currentValue => (currentValue.type === 'text' ? textChannel : voiceChannel).push(currentValue));
  return [textChannel, voiceChannel];
}

getBotMembers = (guild) => {
  return guild.members
    .filter(currentValue => currentValue.user.bot)
    .map(currentValue => '<@!' + currentValue.user.id + '>');
}

exports.run = (message, args) => {
  const content = '';
  let embed = {};

  const guild = message.guild;
  if (guild.available) {
    const channels = getChannels(guild);
    const botMember = getBotMembers(guild);

    // parallel arrays
    const names = [
      `Text channels (${channels[0].length})`,
      `Voice channels (${channels[1].length})`,
      `Roles (${guild.roles.array().length})`,
      `Bots (${botMember.length})`,
      `Members`,
      'Server owner',
      'Server created on'
    ];
    const values = [
      channels[0].join(', '),
      channels[1].join(', '),
      guild.roles.map(currentValue => currentValue.name).join(', '),
      botMember.join(', '),
      `${guild.memberCount}${guild.large ? ' (large)' : ''}`,
      `${guild.owner} (${guild.ownerID})`,
      `${moment(guild.createdAt).format('ddd MMM Do, YYYY [at] HH:mm:ss')}\n(${moment(guild.createdAt).fromNow()})`
    ].map(currentValue => tr.truncateString(currentValue));
    const inlines = [
      true,
      true,
      true,
      true,
      false,
      true,
      true
    ];

    const emojiLength = guild.emojis.array().length;
    if (emojiLength !== 0) {
      names.push(`Emojis (${emojiLength})`);
      values.push(guild.emojis.array().join(' '));
      inlines.push(false);
    }

    embed = {
      thumbnail: {
        url: guild.iconURL === null ? '' : guild.iconURL
      },
      title: `${guild.name} (${guild.id}) | ${guild.region}`,
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
  } else {
    embed = { title: 'Error', description: 'Server information unavailable due to outage.' };
    console.error('server outage');
  }
  message.channel.sendMessage(content, { embed: embed });
};

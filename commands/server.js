const moment = require('moment');
const embed = require('../util/embed.js');
const plurality = require('../util/plurality.js');
const timestamp = require('../util/timestamp.js');
const truncateString = require('../util/truncateString.js');

getChannels = (guild) => {
  const textChannel = [];
  const voiceChannel = [];
  guild.channels
    .map(currentValue => {
      return (currentValue.type === 'text' ? textChannel : voiceChannel)
        .push(currentValue);
    });

  return [textChannel, voiceChannel];
}

getBotMembers = (guild) => {
  return guild.members
    .filter(currentValue => currentValue.user.bot)
    .map(currentValue => '<@!' + currentValue.user.id + '>');
}

exports.run = (message, args) => {
  let e;
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
      'Server created on',
    ];
    const values = [
      truncateString(channels[0]).join(', '),
      truncateString(channels[1]).join(', '),
      truncateString(guild.roles.map(currentValue => currentValue.name))
        .join(', '),
      truncateString(botMember).join(', '),
      `${guild.memberCount}${guild.large ? ' (large)' : ''}`,
      `${guild.owner} (${guild.owner.user.tag})`,
      `${timestamp(guild.createdAt)}\n(${moment(guild.createdAt).fromNow()})`,
    ];
    const inlines = [true, true, true, true, false, true, true,];

    // add emojis to parallel arrays if they exist
    const emojiLength = guild.emojis.array().length;
    if (emojiLength) {
      names.push(`Emojis (${emojiLength})`);
      values.push(guild.emojis.array().join(' '));
      inlines.push(false);
    }

    e = embed.process({
      title: `${guild.name} (${guild.id}) | ${guild.region}`,
      thumbnail: { url: !guild.iconURL ? '' : guild.iconURL, },
      footer: { text: timestamp(message.createdAt), },
      fields: embed.fields(names, values, inlines),
    });
  } else {
    e = embed.process({
      title: 'Error',
      description: 'Server information unavailable due to outage.',
    });
    console.log('Server outage');
  }

  message.channel.send({ embed: e, });
  return true;
}

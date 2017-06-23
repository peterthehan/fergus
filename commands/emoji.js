const embed = require('../util/embed.js');

emoji = (message) => {
  const guild = message.guild;
  if (!guild || !guild.available) {
    console.log('Server outage');
    return embed.process({
      title: 'Error',
      description: 'Server information unavailable.',
    });
  }

  const emojiLength = guild.emojis.array().length;
  if (!emojiLength) {
    return embed.process({
      title: 'Error',
      description: `${guild.name} has no server emojis to list!`,
    });
  }

  return embed.process({
    title: `${guild.name}'s server emoji list (${emojiLength})`,
    description: guild.emojis.array().join(' '),
  });
}

exports.run = (message, args) => {
  const e = emoji(message);

  message.channel.send({ embed: e, });
}
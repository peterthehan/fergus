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

  let emojis = guild.emojis;

  if (!emojis.size) {
    return embed.process({
      title: 'Error',
      description: `${guild.name} has no server emojis to list!`,
    });
  }

  return embed.process({
    title: `${guild.name}'s server emoji list (${emojis.size})`,
    description: emojis.array().join(' '),
  });
}

exports.run = (message, args) => {
  const e = emoji(message);

  message.channel.send({ embed: e, });
}
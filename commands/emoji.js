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

  // handle Discord bug, remove when bug is fixed
  if (guild.id === '258167954913361930') {
    const badEmojis = [
      '360381896603074561', // 2BLewd
      '360381897085288469', // ShinobuNyan
      '360381897278488586', // FeelsBadYukko
    ];
    emojis = emojis.filter(i => !badEmojis.includes(i.id));
  }

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
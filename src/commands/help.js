const config = require('../config.json');

exports.run = (message, args) => {
  const cmds = {
    'Bot': [
      'about',
      'help',
      'ping',
      'status',
    ],
    'Database': [
      'berry',
      'block',
      'bread',
      'faction',
      'find',
      'goddess',
      'hero',
      'portrait',
      'rank',
      'sbw',
      'skill',
      'skin',
      'stats',
      'weapon',
    ],
    'Utility': [
      'fergus',
      'forge',
      'interact',
      'links',
      'pick',
      'popo',
      'pull',
    ],
    'Miscellaneous': [
      'lenny',
      'math',
      'print',
    ],
    'Reserved': [
      'eval',
      'leave',
      'playing',
      'scrape',
    ],
  };

  const e = {
    title: 'Commands',
    description: `Prefix: ${config.prefix}, ${message.client.user}`,
    fields: Object.keys(cmds).map(currentValue => {
      return {
        name: currentValue,
        value: cmds[currentValue].join(', '),
        inline: false,
      };
    }),
    footer: { text: `Android ${config.android_version} | iOS ${config.ios_version}`, },
  };

  message.channel.send({ embed: e, });
}

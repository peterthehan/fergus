const author = require('../util/author.js');
const embed = require('../util/embed.js');

exports.run = (message, args) => {
  const names = [
    'Fergus server',
    'Crusaders Quest server',
    'Bot invite link',
    'GitHub',
    '\u200b',
  ];
  const values = [
    '[discord.gg/WjEFnzC](https://discord.gg/WjEFnzC)',
    '[discord.gg/6TRnyhj](https://discord.gg/6TRnyhj)',
    '[goo.gl/nDluCQ](https://goo.gl/nDluCQ)',
    '[github.com/Johj/fergus](https://github.com/Johj/fergus)',
    'Made with ❤ by ' +
      `${author.user(message)} (${author.user(message).tag}).`,
  ];
  const inlines = [true, true, true, true, false,];

  const e = embed.process({
    title: 'Fergus',
    description:
      'This bot is not affiliated, associated, authorized by, endorsed by, ' +
      'or in any way officially connected with NHN Entertainment Corp., or ' +
      'LoadComplete Inc., or any of their subsidiaries or their affiliates.',
    thumbnail: {
      url: 'https://raw.githubusercontent.com/Johj/fergus/master/assets/fergus.png',
    },
    fields: embed.fields(names, values, inlines),
  });

  message.channel.send({ embed: e, });
  return true;
}

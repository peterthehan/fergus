const author = require('../util/author.js');
const embed = require('../util/embed.js');

exports.run = (message, args) => {
  const names = [
    'Bot invite link',
    'cqdb',
    'Servers',
    'GitHub',
  ];
  const values = [
    '[goo.gl/nDluCQ](https://goo.gl/nDluCQ)',
    '[goo.gl/fdg6M8](https://goo.gl/fdg6M8)',
    '[cqdb/Fergus](https://discord.gg/WjEFnzC)\n' +
      '[Crusaders Quest](https://discord.gg/6TRnyhj)',
    '[/Johj/cqdb](https://github.com/Johj/cqdb)\n' + 
      '[/Johj/fergus](https://github.com/Johj/fergus)',
  ];
  const inlines = [true, true, true, true,];

  const e = embed.process({
    title: message.client.user.username,
    description:
      'Made with ❤ by ' +
      `${author.user(message)} (${author.user(message).tag}).\n\n` +
      'This bot is not affiliated, associated, authorized by, endorsed by, ' +
      'or in any way officially connected with NHN Entertainment Corp., or ' +
      'LoadComplete Inc., or any of their subsidiaries or their affiliates.',
    thumbnail: {
      url: message.client.user.avatarURL,
    },
    fields: embed.fields(names, values, inlines),
  });

  message.channel.send({ embed: e, });
}

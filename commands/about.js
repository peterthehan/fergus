const author = require('../util/author.js');
const embed = require('../util/embed.js');

exports.run = (message, args) => {
  const names = ['Development server', 'Official server', 'GitHub', '\u200b',];
  const values = [
    'https://discord.gg/WjEFnzC',
    'https://discord.gg/6TRnyhj',
    'https://github.com/Johj/fergus',
    'Made with ❤ by ' +
        `${author.mention(message)} (${author.mention(message).tag}).`,
  ];
  const inlines = [true, true, false, false,];

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

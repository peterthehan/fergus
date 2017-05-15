const author = require('../util/author.js');

exports.run = (message, args) => {
  // parallel arrays
  const names = [
    'Development server',
    'Official server',
    'GitHub',
    '\u200b'
  ];
  const values = [
    'https://discord.gg/WjEFnzC',
    'https://discord.gg/6TRnyhj',
    'https://github.com/Johj/fergus',
    `Made with ❤ by ${author.mention(message)} (${author.mention(message).tag}).`
  ];
  const inlines = [true, true, false, false];

  const embed = {
    thumbnail: { url: 'https://raw.githubusercontent.com/Johj/fergus/master/assets/fergus.png' },
    title: 'Fergus',
    description: 'This bot is not affiliated, associated, authorized by, endorsed by, or in any way officially connected with NHN Entertainment Corp., or LoadComplete Inc., or any of their subsidiaries or their affiliates.',
    fields: values.map((currentValue, index) => {
      return { name: names[index], value: currentValue, inline: inlines[index] };
    })
  };
  
  message.channel.send({ embed: embed });
  return true;
};

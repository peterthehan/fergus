const author = require('../util/author.js');

module.exports.run = (message, args) => {
  let content = '';
  let embed = {};
  embed = {
    thumbnail: {
      url: 'https://raw.githubusercontent.com/Johj/fergus/master/assets/fergus.png'
    },
    title: 'Fergus',
    description: 'This bot is not affiliated, associated, authorized by, endorsed by, or in any way officially connected with NHN Entertainment Corp., or LoadComplete Inc., or any of their subsidiaries or their affiliates.',
    fields: [
      {
        name: 'Development Server',
        value: 'https://discord.gg/WjEFnzC',
        inline: true
      },
      {
        name: 'Official Server',
        value: 'https://discord.gg/6TRnyhj',
        inline: true
      },
      {
        name: 'GitHub',
        value: 'https://github.com/Johj/fergus',
        inline: true
      },
      {
        name: '\u200b',
        value: `Made with love by ${author.mention(message)}.`
      }
    ]
  };
  message.channel.sendMessage(content, { embed: embed });
};

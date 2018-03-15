const config = require('../config.json');

exports.run = (message, args) => {
  const e = {
    title: message.client.user.username,
    description: `Made with ❤ by ${message.guild.members.get(config.owner_id)} (${message.guild.members.get(config.owner_id).user.tag}).` + '\n\nThis bot is not affiliated, associated, authorized by, endorsed by, or in any way officially connected with NHN Entertainment Corp., LoadComplete Inc., or any of their subsidiaries or their affiliates.',
    footer: { text: `Android ${config.android_version} | iOS ${config.ios_version}`, },
    thumbnail: { url: message.client.user.avatarURL, },
    fields: [
      {
        name: `Invite ${message.client.user.username}`,
        value: '[goo.gl/nDluCQ](https://goo.gl/nDluCQ)',
        inline: true,
      },
      {
        name: 'cqdb',
        value: '[johj.github.io/cqdb](https://goo.gl/fdg6M8)',
        inline: true,
      },
      {
        name: 'Join Servers',
        value: '[idk](https://discord.gg/WjEFnzC)\n[Crusaders Quest](https://discord.gg/6TRnyhj)',
        inline: true,
      },
      {
        name: 'GitHub',
        value: '[/Johj/fergus](https://github.com/Johj/fergus)\n[/Johj/cqdb](https://github.com/Johj/cqdb)',
        inline: true,
      },
    ],
  };

  message.channel.send({ embed: e, });
}

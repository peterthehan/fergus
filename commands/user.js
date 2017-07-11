const moment = require('moment');
const embed = require('../util/embed.js');
const timestamp = require('../util/timestamp.js');

exports.run = (message, args) => {
  // determine id
  let id;
  if (!args.length) {
    id = message.author.id;
  } else {
    const re = new RegExp(/^<@!?|>$/, 'g');
    id = re.test(args[0])
      ? args.shift().replace(re, '')
      : message.author.id;
  }

  message.guild
    .fetchMember(id)
    .then(guildMember => {
      const names = [
        'Nickname',
        '\u200b',
        'Status',
        'Playing',
        'Joined Discord on',
        'Joined Server on',
        'Roles',
      ];
      const values = [];
      const inlines = [true, true, true, true, true, true, true,];

      values.push(!guildMember.nickname ? '-' : guildMember.nickname);
      values.push('\u200b');
      values.push(
        guildMember.user.presence.status.toString().charAt(0).toUpperCase() +
        guildMember.user.presence.status.toString().substr(1).toLowerCase()
      );
      values.push(!guildMember.user.presence.game
        ? '-'
        : guildMember.user.presence.game.name
      );
      values.push(
        timestamp(guildMember.user.createdAt).split(' at ').join('\nat ') +
        `\n(${moment(guildMember.user.createdAt).fromNow()})`
      );
      values.push(
        timestamp(guildMember.joinedAt).split(' at ').join('\nat ') +
        `\n(${moment(guildMember.joinedAt).fromNow()})`
      );
      names[names.length - 1] += ` (${guildMember.roles.array().length})`;
      values.push(guildMember.roles.map(i => i.name).join(', '));

      const e = embed.process({
        title: `${guildMember.user.tag} (${guildMember.user.id})`,
        description: guildMember.user.bot ? 'Bot Account' : '',
        footer: { text: timestamp(message.createdAt), },
        thumbnail: { url: guildMember.user.avatarURL, },
        fields: embed.fields(names, values, inlines),
      });

      message.channel.send({ embed: e, });
    });
}

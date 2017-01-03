const moment = require('moment');
module.exports.run = (message, args) => {
  const client = message.client;
  const guild = message.guild;
  let id;

  let embed = require('../util/embed.js').run();
  if (args.length === 1) {
    id = message.author.id;
  } else {
    id = args[1].substr(2, args[1].toString().length - 3);
    guild.fetchMember(id)
      .then()
      .catch((error) => {
        embed.setDescription('@tag a user!');
        message.channel.sendEmbed(embed);
        console.error(`${error.name}: ${error.message}`)
        return;
      });
  }

  guild.fetchMember(id)
    .then(guildMember => {
      embed
        .addField(
          'Nickname',
          guildMember.nickname === null ? '-' : guildMember.nickname,
          true)
        .addField(
          `Roles (${guildMember.roles.array().length})`,
          guildMember.roles.map(i => i.name).join(', '),
          true)
    })
    .catch(error => console.error(`${error.name}: ${error.message}`));

  client.fetchUser(id)
    .then(user => {
      if (user.bot) {
        embed.setDescription('Bot Account');
      }
      embed
        .setThumbnail(user.avatarURL)
        .setTitle(`${user.username}#${user.discriminator} (${user.id})`)
        .addField(
          'Status',
          user.presence.status.toString().charAt(0).toUpperCase() +
          user.presence.status.toString().substr(1).toLowerCase(),
          true)
        .addField(
          'Playing',
          user.presence.game === null ? '-' : user.presence.game.name,
          true)
        .addField(
          'Joined Discord on',
          `${moment(user.createdAt).format('ddd MMM Do, YYYY [at] HH:mm:ss')}\n(${moment(user.createdAt).fromNow()})`,
          true);
    })
    .catch(error => console.error(`${error.name}: ${error.message}`));

  guild.fetchMember(id)
    .then(guildMember => {
      embed
        .addField(
          'Joined Server on',
          `${moment(guildMember.joinedAt).format('ddd MMM Do, YYYY [at] HH:mm:ss')}\n(${moment(guildMember.joinedAt).fromNow()})`,
          true)
        .setFooter(moment(message.createdAt).format('ddd MMM Do, YYYY [at] HH:mm:ss'));
      message.channel.sendEmbed(embed);
    })
    .catch(error => console.error(`${error.name}: ${error.message}`));
};

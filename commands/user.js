exports.run = function(message, args) {
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
          guildMember.nickname === null ? 'None' : guildMember.nickname,
          true)
        .addField(
          'Roles',
          guildMember.roles.array().slice().map(index => index.name).join(', '),
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
        .setAuthor(`${user.username}#${user.discriminator} (${user.id})`)
        .addField(
          'Status',
          user.presence.status.toString().charAt(0).toUpperCase() +
          user.presence.status.toString().substr(1).toLowerCase(),
          true)
        .addField(
          'Playing',
          user.presence.game === null ? 'Nothing' : user.presence.game.name,
          true)
        .addField('Account Created On', user.createdAt.toLocaleString(), true);
    })
    .catch(error => console.error(`${error.name}: ${error.message}`));

  guild.fetchMember(id)
    .then(guildMember => {
      embed
        .addField(
          'Joined Server On', guildMember.joinedAt.toLocaleString(), true);
      message.channel.sendEmbed(embed);
    })
    .catch(error => console.error(`${error.name}: ${error.message}`));
};

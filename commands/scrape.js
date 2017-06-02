const author = require('../util/author.js');
const embed = require('../util/embed.js');

scrape = (message, args) => {
  const fs = require('fs');
  const members = message.guild.members;
  const dict = {};

  for (member of members) {
    const m = member[1];
    dict[m.id] = {
      colorRole: (!m.colorRole ? null : m.colorRole.name),
      deaf: m.deaf,
      displayColor: m.displayColor,
      displayHexColor: m.displayHexColor,
      displayName: m.displayName,
      highestRole: m.highestRole.name,
      hoistRole: (!m.hoistRole ? null : m.hoistRole.name),
      id: m.id,
      joinedTimestamp: m.joinedTimestamp,
      mute: m.mute,
      nickname: m.nickname,
      roles: m.roles.map(i => i.name),
      selfDeaf: m.selfDeaf,
      selfMute: m.selfMute,
      serverDeaf: m.serverDeaf,
      serverMute: m.serverMute,
      user: {
        avatar: m.user.avatar,
        avatarURL: m.user.avatarURL,
        bot: m.user.bot,
        createdTimestamp: m.user.createdTimestamp,
        defaultAvatarURL: m.user.defaultAvatarURL,
        discriminator: m.user.discriminator,
        displayAvatarURL: m.user.displayAvatarURL,
        id: m.user.id,
        tag: m.user.tag,
        username: m.user.username
      },
      voiceChannelID: m.user.voiceChannelID,
      voiceSessionID: m.user.voiceSessionID,
    };
  }

  fs.writeFile(
    `./${message.guild.name}_${message.guild.id}.json`,
    JSON.stringify(dict, null, 2),
    (error) => {
      let e;
      if (error) {
        e = embed.process({
          title: 'Error',
          description: 'Could not write to file!',
        });
        console.log(error);
      } else {
        const msg = 'Data written to file!';
        e = embed.process({
          title: 'Success',
          description: msg,
        });
        console.log(msg);
      }

      message.channel.send({ embed: e, });
    }
  )
}

exports.run = (message, args) => {
  let e;
  if (message.author.id === author.id()) {
    scrape(message, args);
  } else {
    e = embed.process({ title: 'Error', description: 'Access denied.', });
    message.channel.send({ embed: e, });
  }
};

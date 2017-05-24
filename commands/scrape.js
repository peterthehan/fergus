const author = require('../util/author.js');
const embed = require('../util/embed.js');

scrape = (message, args) => {
  const fs = require('fs');
  const members = message.guild.members;
  const dict = {};

  for (member of members) {
    const m = member[1];
    dict[m.id] = {
      displayName: m.displayName,
      id: m.id,
      joinedTimestamp: m.joinedTimestamp,
      nickname: m.nickname,
      user: {
        avatarURL: m.user.avatarURL,
        bot: m.user.bot,
        createdTimestamp: m.user.createdTimestamp,
        defaultAvatarURL: m.user.defaultAvatarURL,
        discriminator: m.user.discriminator,
        displayAvatarURL: m.user.displayAvatarURL,
        id: m.user.id,
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
  const isAuthor = message.author.id === author.id();
  let e;
  if (isAuthor) {
    scrape(message, args);
  } else {
    e = embed.process({ title: 'Error', description: 'Access denied.', });
    message.channel.send({ embed: e, });
  }

  return isAuthor;
};

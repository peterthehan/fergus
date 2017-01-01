const moment = require('moment');
exports.run = function(message, args) {
  const guild = message.guild;

  let embed = require('../util/embed.js').run();
  if (guild.available) {
    let textChannel = [];
    let voiceChannel = [];
    guild.channels.map(i => {
      if (i.type === 'text') {
        textChannel.push(i);
      } else if (i.type === 'voice') {
        voiceChannel.push(i);
      }
    });
    let botMember = [];
    guild.members.map(i => {
      if (i.user.bot) {
        botMember.push(i);
      }
    });

    if (guild.iconURL !== null) {
      embed.setThumbnail(guild.iconURL);
    }
    embed
      .setTitle(`${guild.name} (${guild.id}) | ${guild.region}`)
      .addField(`Text Channels (${textChannel.length})`, textChannel.join(', '), true)
      .addField(`Voice Channels (${voiceChannel.length})`, voiceChannel.join(', '), true)
      .addField(
        `Roles (${guild.roles.array().length})`,
        guild.roles.map(i => i.name).join(', '),
        guild.emojis.array().length !== 0);
    if (guild.emojis.array().length !== 0) {
      embed.addField(
        `Emojis (${guild.emojis.array().length})`,
        guild.emojis.array().join(' '),
        true);
    }
    embed
      .addField('Members', `${guild.memberCount}${(guild.large ? ' (large)' : '')}`, true)
      .addField(`Bots (${botMember.length})`, botMember.join(', '), true)
      .addField('Server Owner', `${guild.owner} (${guild.ownerID})`, true)
      .addField(
        'Server Created on',
        `${moment(guild.createdAt).format('ddd MMM Do, YYYY [at] HH:mm:ss')}\n(${moment(guild.createdAt).fromNow()})`
        ,
        true)
      .setFooter(moment(message.createdAt).format('ddd MMM Do, YYYY [at] HH:mm:ss'));
  } else {
    embed.setDescription('Information unavailable due to server outage.');
    console.error('server outage');
  }
  message.channel.sendEmbed(embed);
};

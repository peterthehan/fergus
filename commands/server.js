exports.run = function(message, args) {
  const guild = message.guild;

  let embed = require('../util/embed.js').run();
  if (guild.available) {
    if (guild.iconURL !== null) {
      embed.setThumbnail(guild.iconURL);
    }

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

    embed
      .setTitle(`${guild.name} (${guild.id}) | ${guild.region}`)
      .addField(`Text Channels (${textChannel.length})`, textChannel.join(', '), true)
      .addField(`Voice Channels (${voiceChannel.length})`, voiceChannel.join(', '), true)
      .addField(`Roles (${guild.roles.array().length})`, guild.roles.map(i => i.name).join(', '), true)
      .addField(`Emojis (${guild.emojis.array().length})`, guild.emojis.array().join(' '), true)
      .addField('Members', `${guild.memberCount}${(guild.large ? ' (large)' : '')}`, true)
      .addField(`Bots (${botMember.length})`, botMember.join(', '), true)
      .addField('Server Owner', `${guild.owner} (${guild.ownerID})`, true)
      .addField('Server Created On', guild.createdAt.toLocaleString(), true)
      .setTimestamp(message.createdAt);
  } else {
    embed.setDescription('Server information unavailable due to outage.');
    console.error('server outage');
  }
  message.channel.sendEmbed(embed);
};

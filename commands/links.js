module.exports.run = (message, args) => {
  const embed = require('../util/embed.js').run()
    .setTitle('Useful Links')
    .addField(
      'Tier Lists',
      '[Hero/SBW/Skill IRC Tier List](https://goo.gl/oNQ2iF) by jaetheho, Viress, sakai4eva, kamakiller\n' +
      '[Accurina\'s Inaccurate Tier List](https://goo.gl/bBgMTg) by Accurina')
    .addField(
      'Champions',
      '[Vyrlokar\'s Ultimate Guide to the CQ Champions](https://goo.gl/M37qRm) by Vyrlokar')
    .addField(
      'Monuments',
      '[CQ Monuments and How To Get Them](https://goo.gl/UiWxOI) by /u/CalvinCopyright')
    .addField(
      'Manacar',
      '[Manacar Rage, Ruin, Void, and End](https://goo.gl/PbpKdG) by kamakiller')
    .addField(
      'Fortress of Souls',
      '[Guide to unlocking "secret" FoS10](https://goo.gl/9BXBkD) by /u/LargeBagel');
  message.channel.sendEmbed(embed);
};

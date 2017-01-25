const Sherlock = require('sherlockjs');
const moment = require('moment');

module.exports.run = (message, args) => {
  const s = Sherlock.parse(args.slice(1).join(' '));
  const relative = s.startDate.getTime() - Date.now();
  s.eventTitle = s.eventTitle.replace(/^to ?/, '');
  const embed = require('../util/embed.js').run()
    .setDescription(`I will remind you to ${s.eventTitle} ${moment().add(relative, 'ms').fromNow()}.`);
  message.channel.sendEmbed(embed);
  setTimeout(() => {
    const final = `Reminder: ${s.eventTitle}`;
    message.author.send(final).catch(() => {
      message.channel.send(`${message.author} ${final}`);
    });
  }, relative);
};

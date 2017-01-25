const Sherlock = require('sherlockjs');
const moment = require('moment');
module.exports.run = (message, args) => {
  const embed = require('../util/embed.js').run();
  if (args.length === 1) {
    embed.setDescription('Enter an event!');
  } else {
    const s = Sherlock.parse(args.slice(1).join(' '));
    if (s.startDate === null) {
      embed.setDescription('Enter a relative time!');
    } else {
      const relative = s.startDate.getTime() - Date.now();
      const fromNow = moment().add(relative, 'ms').fromNow();
      if (s.eventTitle === null) {
        s.eventTitle = `${fromNow.substring(3, fromNow.toString().length)} has elapsed.`;
        embed.setDescription(`I will remind you ${fromNow}.`);
      } else {
        s.eventTitle = s.eventTitle.replace(/^to ?/, '');
        embed.setDescription(`I will remind you to ${s.eventTitle} ${fromNow}.`);
      }
      setTimeout(() => {
        const final = `Reminder: ${s.eventTitle}`;
        message.author.send(final).catch(() => {
          message.channel.send(`${message.author} ${final}`);
        });
      }, relative);
    }
  }
  message.channel.sendEmbed(embed);
};

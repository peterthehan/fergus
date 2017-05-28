const humanizeDuration = require('humanize-duration');
const moment = require('moment');
const Sherlock = require('../Sherlock/sherlock.min.js');
const embed = require('../util/embed.js');

remindMeInstructions = (message) => {
  const max = 86400000;

  const names = ['<event>', '\u200b',];
  const values = [
    'Create a reminder.\n*e.g. !remindme to eat in an hour*',
    `Note: Bot session will cycle in ` +
      `${humanizeDuration(max - message.client.uptime, { round: true, })} ` +
      `+ [up to 216 random minutes](https://devcenter.heroku.com/articles/dynos#restarting).` +
      ` Keep your <event> under this time.`,
  ];
  const inlines = [true, false,];

  return embed.process({
    title: '!remindme [<event>]',
    fields: embed.fields(names, values, inlines),
  });
}

remindMe = (message, args) => {
  const evt = Sherlock.parse(args.join(' '));
  if (!evt.startDate) {
    return embed.process({
      title: 'Error',
      description: 'Your <event> needs a time!',
    });
  }

  if (evt.eventTitle) {
    evt.eventTitle = evt.eventTitle.replace(/^to ?|^in ?/, '');
  }

  const relative = evt.startDate.getTime() - Date.now();
  const fromNow = moment().add(relative, 'ms').fromNow();
  setTimeout(() => {
    const msg = embed.process({
      title: 'Reminder',
      description: !evt.eventTitle ? 'Time elapsed.' : evt.eventTitle,
    });
    message.author.send({ embed: msg, })
      .catch(() => message.channel.send({ embed: msg, }));
  }, relative);

  return embed.process({ description: `I'll remind you ${fromNow}.`, });
}

exports.run = (message, args) => {
  const e = !args.length
    ? remindMeInstructions(message)
    : remindMe(message, args);

  message.channel.send({ embed: e, });
  return true;
};

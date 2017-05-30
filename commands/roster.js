const firebase = require('firebase');
const humanizeDuration = require('humanize-duration');
const author = require('../util/author.js');
const embed = require('../util/embed.js');

const database = firebase.database();
const userInteractions = {};
const maxUsage = 3;

rosterInstructions = (message) => {
  const max = 86400000; // 24h = 86400000 ms

  const names = ['w <url>', 'r <user>', 'd', '\u200b',];
  const values = [
    'Write <url> to database.\n*e.g. !roster w <url>*',
    'Read <user> data.\n' +
      `*e.g. !roster r ${author.user(message)}*`,
    'Delete data.\n*e.g. !roster d*',
    `Note: <url> must be from one of: ${whiteList().join(', ')}. ` +
    `This command can only be used ${maxUsage} times per user per *session*` +
    ` (bot session will cycle in ` +
    `${humanizeDuration(max - message.client.uptime, { round: true, })} ` +
    `+ [up to 216 random minutes](https://devcenter.heroku.com/articles/dynos#restarting)).`,
  ];
  const inlines = [true, true, true, false,];

  return embed.process({
    title: '!roster [w <url>|r <user>|d]',
    fields: embed.fields(names, values, inlines),
  });
}

rosterWrite = (message, args) => {
  let e;
  if (sanitizeURL(args[0])) {
    database.ref(`users/${message.author.id}`).set({ url: args[0], });
    e = embed.process({
      title: 'Success',
      description: `${message.author}: URL saved!`,
    });
  } else {
    e = embed.process({
      title: 'Error',
      description:
        `Invalid <url>. <url> must be from one of: ${whiteList().join(', ')}.`,
    });
  }

  return e;
}

rosterRead = (message, args) => {
  const user = getUser(message, args);
  database
    .ref(`users/${user.id}`)
    .once('value')
    .then((snapshot) => {
      const e = snapshot.val()
        ? embed.process({ description: `${user}: ${snapshot.val().url}`, })
        : embed.process({
            title: 'Error',
            description: `No URL found for ${user}!`,
          });
      message.channel.send({ embed: e, });
    });

  return null;
}

rosterDelete = (message, args) => {
  const user = message.author.id === author.id()
    ? getUser(message, args)
    : message.author;
  database.ref(`users/${user.id}`).remove();
  return embed.process({
    title: 'Success',
    description: `${user}: URL deleted!`,
  });
}

// helper function
getUser = (message, args) => {
  if (!args.length || !args[0].startsWith('<@') || !args[0].endsWith('>')) {
    return message.author;
  }
  return message.client.users.get(args[0].replace(/\D/g, ''));
}

// helper function
sanitizeURL = (url) => {
  return url && whiteList()
    .map(currentValue => url.startsWith(currentValue))
    .includes(true);
}

whiteList = () => {
  return [
    'https://imgur.com/',
    'https://www.dropbox.com/',
    'https://drive.google.com/',
    'https://raw.githubusercontent.com/',
  ];
}

exports.run = (message, args) => {
  let e;
  if (!args.length) {
    e = rosterInstructions(message);
  } else {
    const action = args.shift().toLowerCase();
    if (action.startsWith('w')) {
      if (!userInteractions[message.author.id]) {
        userInteractions[message.author.id] = 0;
      }

      if (message.author.id === author.id()
        || userInteractions[message.author.id] < maxUsage
      ) {
        e = rosterWrite(message, args);

        if (e.title === 'Success') {
          ++userInteractions[message.author.id];
        }
      } else {
        e = embed.process({
          title: 'Error',
          description:
            `You have used up your ${maxUsage} roster command allowances! ` +
            'Wait for the session to cycle to use this command again.',
        });
      }
    } else if (action.startsWith('r')) {
      e = rosterRead(message, args);
    } else if (action.startsWith('d')) {
      e = rosterDelete(message, args);
    } else {
      e = rosterInstructions(message);
    }
  }

  if (e) {
    message.channel.send({ embed: e, });
  }
}

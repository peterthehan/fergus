const humanizeDuration = require('humanize-duration');
const countInstances = require('../util/countInstances.js');
const embed = require('../util/embed.js');
const imagePath = require('../util/imagePath.js');
const random = require('../util/random.js');
const truncateString = require('../util/truncateString.js');
const userTimer = require('../util/userTimer.js');

popoImage = () => {
  return imagePath(`popo%20(${random(1, 4)})`);
}

popoInstructions = () => {
  const names = ['go', 'no', 'me', 'list',];
  const values = [
    'Start a 15 minute timer.\n*e.g. !popo go*',
    'Cancel timer.\n*e.g. !popo no*',
    'Check remaining time.\n*e.g. !popo me*',
    `List all user timers.\n*e.g. !popo list*`,
  ];
  const inlines = [true, true, true, true,];

  return embed.process({
    title: '!popo [go|no|me|list]',
    thumbnail: { url: popoImage(), },
    fields: embed.fields(names, values, inlines),
  });
}

popoGo = (message) => {
  if (userTimer.exists(message.author.id)) {
    return embed.process({
      title: 'Error',
      description: `You already have a running timer!`,
      thumbnail: { url: popoImage(), },
    });
  }

  // 900000 ms = 15 minutes
  const time = 900000;
  userTimer.addTimer(message, `Popo has left!`, time);
  return embed.process({
    title: 'Timer started',
    description:
        `I'll let you know when ` +
        `${humanizeDuration(time, { round: true })} have passed!`,
    thumbnail: { url: popoImage(), },
  });
}

popoNo = (id) => {
  if (userTimer.exists(id)) {
    userTimer.removeTimer(id);
    return embed.process({
      title: 'Timer canceled',
      description: `Your timer has been canceled!`,
      thumbnail: { url: popoImage(), },
    });
  }

  return embed.process({
    title: 'Error',
    description: `You don't have a timer to cancel!`,
    thumbnail: { url: popoImage(), },
  });
}

popoMe = (id) => {
  if (userTimer.exists(id)) {
    return embed.process({
      title: 'Time remaining',
      description: remainingTimeMessage(id),
      thumbnail: { url: popoImage(), },
    });
  }

  return embed.process({
    title: 'Error',
    description: `You don't have a timer to check!`,
    thumbnail: { url: popoImage(), },
  });
}

popoList = () => {
  const timers = userTimer.getTimers();

  if (Object.keys(timers).length === 0 && timers.constructor === Object) {
    return embed.process({
      title: 'Error',
      description: 'There are no user timers to list!',
      thumbnail: { url: popoImage(), },
    });
  }

  const remaining = [];
  for (let id in timers) {
    if (!timers.hasOwnProperty(id)) {
      continue;
    }
    remaining.push(remainingTimeMessage(id));
  }

  const description = truncateString(remaining.join('\n'), '\n');
  return embed.process({
    title:
        'Time remaining list ' +
        `(${countInstances(description, '\n') + 1} of ${remaining.length})`,
    description: description,
    thumbnail: { url: popoImage() },
  });
}

// helper function
remainingTimeMessage = (id) => {
  return `<@!${id}>: ` +
      `${humanizeDuration(userTimer.getRemainingTime(id), { round: true })}`;
}

exports.run = (message, args) => {
  let e;
  if (args.length === 0) {
    e = popoInstructions();
  } else {
    if (args[0].startsWith('go')) {
      e = popoGo(message);
    } else if (args[0].startsWith('no')) {
      e = popoNo(message.author.id);
    } else if (args[0].startsWith('me')) {
      e = popoMe(message.author.id);
    } else if (args[0].startsWith('list')) {
      e = popoList(message);
    } else { // anything else, give instructions again
      e = popoInstructions();
    }
  }

  message.channel.send({ embed: e, });
  return true;
}

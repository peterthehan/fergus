const humanizeDuration = require('humanize-duration');
const imagePath = require('../util/imagePath.js');
const countInstances = require('../util/countInstances.js');
const random = require('../util/random.js');
const truncateString = require('../util/truncateString.js');
const userTimer = require('../util/userTimer.js');

popoInstructions = () => {
  return {
    thumbnail: { url: imagePath(`popo%20(${random(1, 4)})`) },
    title: '!popo [go|no|me|list]',
    fields: [
      {
        name: 'go',
        value: 'Start a 15 minute timer.\n*e.g. !popo go*',
        inline: true
      },
      {
        name: 'no',
        value: 'Cancel timer.\n*e.g. !popo no*',
        inline: true
      },
      {
        name: 'me',
        value: 'Check remaining time.\n*e.g. !popo me*',
        inline: true
      },
      {
        name: 'list',
        value: `List all user timers.\n*e.g. !popo list*`,
        inline: true
      }
    ]
  };
}

popoGo = (message) => {
  if (userTimer.exists(message.author.id)) {
    return { thumbnail: { url: imagePath(`popo%20(${random(1, 4)})`) }, title: 'Error', description: `You already have a running timer!` };
  }
  userTimer.addTimer(message, `Popo has left!`);
  return { thumbnail: { url: imagePath(`popo%20(${random(1, 4)})`) }, title: 'Timer started', description: `I'll let you know when 15 minutes have passed!` };
}

popoNo = (id) => {
  if (userTimer.exists(id)) {
    userTimer.removeTimer(id);
    return { thumbnail: { url: imagePath(`popo%20(${random(1, 4)})`) }, title: 'Timer canceled', description: `Your timer has been canceled!` };
  }
  return { thumbnail: { url: imagePath(`popo%20(${random(1, 4)})`) }, title: 'Error', description: `You don't have a timer to cancel!` };
}

popoMe = (id) => {
  if (userTimer.exists(id)) {
    return { thumbnail: { url: imagePath(`popo%20(${random(1, 4)})`) }, title: 'Time remaining', description: remainingTimeMessage(id) };
  }
  return { thumbnail: { url: imagePath(`popo%20(${random(1, 4)})`) }, title: 'Error', description: `You don't have a timer to check!` };
}

popoList = () => {
  const timers = userTimer.getTimers();

  if (Object.keys(timers).length === 0 && timers.constructor === Object) {
    return { thumbnail: { url: imagePath(`popo%20(${random(1, 4)})`) }, title: 'Error', description: 'There are no user timers to list!' };
  }

  const remaining = [];
  for (let id in timers) {
    if (!timers.hasOwnProperty(id)) {
      continue;
    }
    remaining.push(remainingTimeMessage(id));
  }

  const description = truncateString(remaining.join('\n'), '\n');
  return {
    thumbnail: { url: imagePath(`popo%20(${random(1, 4)})`) },
    title: `Time remaining list (${countInstances(description, '\n') + 1} of ${remaining.length})`,
    description: description
  };
}

// helper function
remainingTimeMessage = (id) => {
  return `<@!${id}>: ${humanizeDuration(userTimer.getRemainingTime(id), { round: true })}`;
}

exports.run = (message, args) => {
  let embed;

  if (args.length === 0) {
    embed = popoInstructions();
  } else {
    if (args[0].startsWith('go')) {
      embed = popoGo(message);
    } else if (args[0].startsWith('no')) {
      embed = popoNo(message.author.id);
    } else if (args[0].startsWith('me')) {
      embed = popoMe(message.author.id);
    } else if (args[0].startsWith('list')) {
      embed = popoList(message);
    } else { // anything else, give instructions again
      embed = popoInstructions();
    }
  }

  message.channel.send({ embed: embed });
  return true;
}

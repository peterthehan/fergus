const bounds = require('../util/bounds.js');
const embed = require('../util/embed.js');

deleteInstructions = (message) => {
  const names = ['<number>', '\u200b',];
  const values = [
    'Delete your previous <number> messages.\n*e.g. !delete 1*',
    'Limitations: ' +
    '<number>: [1, 10] (defaults to 1 for anything outside this range), ' +
    'cannot delete messages ' +
    '[older than 2 weeks](https://discord.js.org/#/docs/main/stable/class/TextChannel?scrollTo=bulkDelete).',
  ];
  const inlines = [true, false,];

  const e = embed.process({
    title: '!delete [<number>]',
    fields: embed.fields(names, values, inlines),
  });

  message.channel.send({ embed: e, });
}

deleteMessage = (message, args) => {
  const number = [2, 11];
  number.push(!isNaN(args[0]) ? parseInt(args[0]) + 1 : 2);
  const bound = bounds(number);

  message.channel.fetchMessages()
    .then(messages => {
      const deleteMessages = [];
      for (i of messages.array()) {
        if (i.author.id === message.author.id) {
          deleteMessages.push(i);
          if (deleteMessages.length >= bound) {
            break;
          }
        }
      }

      // api bounds
      if (deleteMessages.length >= 2 && deleteMessages.length < 100) {
        message.channel.bulkDelete(deleteMessages);
      } else {
        const e = embed.process({
          title: 'Error',
          description: 'You have no more messages to delete!',
        });
        
        message.channel.send({ embed: e, });
      }
    })
    .catch(error => console.log(error));
}

exports.run = (message, args) => {
  !args.length ? deleteInstructions(message) : deleteMessage(message, args);

  return true;
};

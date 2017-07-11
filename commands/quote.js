const author = require('../util/author.js');
const bounds = require('../util/bounds.js');
const embed = require('../util/embed.js');
const timestamp = require('../util/timestamp.js');

quoteInstructions = (message) => {
  const names = ['<mention>', '<index>', '\u200b',];
  const values = [
    `Tag the user to be quoted.\n*e.g. !quote ${author.user(message)}*`,
    `Message index. If not specified, defaults to 0.\n` +
      `*e.g. !quote ${author.user(message)} 4*`,
    `Note: Only fetches the past 50 total messages to find quotes. ` +
      `Any message beyond this limit cannot be quoted.`,
  ];
  const inlines = [true, true, false,];

  return embed.process({
    title: '!quote [<mention>] [<index>]',
    fields: embed.fields(names, values, inlines),
  });
}

quote = (message, args, id) => {
  message.client
    .fetchUser(id)
    .then(user => {
      message.channel
        .fetchMessages({ limit: 50, })
        .then(messages => {
          const msgs = messages
            .array()
            .filter(element => element.author.id === id);

          const index = !isNaN(args[0])
            ? bounds([0, msgs.length - 1, parseInt(args[0])])
            : 0;

          const e = !msgs.length
            ? {
                title: 'Error',
                description:
                  `No message by ${user} ` +
                  `could be found within the past 50 messages!`,
              }
            : {
                description: msgs[index].content,
                footer: { text: timestamp(msgs[index].createdAt), },
                author: {
                  name: msgs[index].author.tag,
                  icon_url: msgs[index].author.displayAvatarURL,
                },
              };

          message.channel.send({ embed: embed.process(e), });
        });
    })
    .catch(error => console.log(error));
}

exports.run = (message, args) => {
  if (!args.length) {
    const e = quoteInstructions(message);
    
    message.channel.send({ embed: e, });
  } else {
    const re = new RegExp(/^<@!?|>$/, 'g');
    const id = re.test(args[0])
      ? args[0].replace(re, '')
      : message.author.id;
    args.shift();
    
    quote(message, args, id);
  }
}

const embed = require('../util/embed.js');

printInstructions = () => {
  const names = ['<text>',];
  const values = ['Print <text>.\n*e.g. !print hello world*',];
  const inlines = [true,];

  return embed.process({
    title: '!print [<text>]',
    fields: embed.fields(names, values, inlines),
  });
}

printMessage = (message, args) => {
  message.delete();
  return embed.process({ description: args.join(' ') });
}

exports.run = (message, args) => {
  const e = !args.length ? printInstructions() : printMessage(message, args);

  message.channel.send({ embed: e, });
  return true;
}

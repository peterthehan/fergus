const { getPrefix, } = require('../util/get.js');

printInstructions = () => {
  const prefix = getPrefix(message);
  const e = {
    title: `${prefix}print [<text>]`,
    fields: [
      {
        name: '<text>',
        value: `Print <text>.\n*e.g. ${prefix}print hello world*`,
      },
    ],
  };

  return e;
}

printMessage = (message, args) => {
  message.delete();
  return { description: args.join(' '), };
}

exports.run = (message, args) => {
  const e = !args.length ? printInstructions(message) : printMessage(message, args);

  message.channel.send({ embed: e, });
}

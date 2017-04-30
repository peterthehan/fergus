square = (str) => {
  let description = '```';
  if (str.length === 1) {
    description += str;
  } else {
    description += str.split('').join(' ') + '\n';
    if (str.length > 2) {
      for (let i = 1; i < str.length - 1; ++i) {
        description +=
          str.charAt(i) +
          ' '.repeat((str.length * 2) - 1 - 2) +
          str.charAt(str.length - i - 1) + '\n';
      }
    }
    description += str.split('').reverse().join(' ');
  }
  description += '```';

  return { description: description };
}

exports.run = (message, args) => {
  const content = '';
  let embed = {};

  if (args.length === 0) {
    embed = { description: 'Type something!' };
  } else {
    const str = args.join(' ');
    embed = str.length <= 16 ? square(str) : { description: 'Message is too long!' };
  }
  message.channel.sendMessage(content, { embed: embed });
};

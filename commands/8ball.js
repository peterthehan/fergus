const embed = require('../util/embed.js');
const random = require('../util/random.js');

exports.run = (message, args) => {
  // https://en.wikipedia.org/wiki/Magic_8-Ball#Possible_answers
  const answers = [
    'It is certain',
    'It is decidedly so',
    'Without a doubt',
    'Yes definitely',
    'You may rely on it',
    'As I see it, yes',
    'Most likely',
    'Outlook good',
    'Yes',
    'Signs point to yes',
    'Reply hazy try again',
    'Ask again later',
    'Better not tell you now',
    'Cannot predict now',
    'Concentrate and ask again',
    `Don't count on it`,
    'My reply is no',
    'My sources say no',
    'Outlook not so good',
    'Very doubtful',
  ];

  const e = embed.process({
    description:
        `${message.author} (${message.author.tag}), ` +
        `${answers[random(0, answers.length - 1)].toLowerCase()}.`,
  });

  message.channel.send({ embed: e, });
  return true;
}

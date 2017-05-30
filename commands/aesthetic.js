const embed = require('../util/embed.js');
const random = require('../util/random.js');

aestheticInstructions = () => {
  const names = ['<text>',];
  const values = ['Aesthetify <text>.\ne.g. !aesthetic hello world',];
  const inlines = [true,];

  return embed.process({
    title: aesthetic('!aesthetic [<text>]'),
    fields: embed.fields(
      names.map(i => aesthetic(i)),
      values.map(i => aesthetic(i)),
      inlines
    ),
  });
}

aestheticMessage = (args) => {
  return embed.process({
    description: aesthetic(args.join(' ')),
  });
}

//  !"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\]^_`abcdefghijklmnopqrstuvwxyz{|}~
// helper function
aesthetic = (string) => {
  return string
    .replace(/ /g, '　') // U+3000 ideographic space
    .replace(/[!-~]/g, (ch) => String.fromCharCode(ch.charCodeAt(0) + 0xfee0));
}

exports.run = (message, args) => {
  const e = !args.length ? aestheticInstructions() : aestheticMessage(args);

  message.channel.send({ embed: e, });
}

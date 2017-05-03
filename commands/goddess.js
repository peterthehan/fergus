const d = require('../data.js');
const goddess = d.goddess();

const fuzzy = require('../util/fuzzy.js');
const imagePath = require('../util/imagePath.js');
const list = require('../util/list.js');
const resolve = require('../util/resolve.js');

goddessInstructions = () => {
  return {
    title: '!goddess [list|<name>]',
    fields: [
      {
        name: 'list',
        value: 'List all goddesses.\n*e.g. !goddess list*',
        inline: true
      },
      {
        name: '<name>',
        value: 'Get goddess information.\n*e.g. !goddess sera*',
        inline: true
      }
    ]
  };
}

goddessList = () => {
  return { description: list(goddess, 'name') };
}

goddessInfo = (name) => {
  const data = fuzzy(name, goddess, 'name');

  // parallel arrays
  const names = [resolve(data['skillname'])];
  const values = [resolve(data['skilldesc'])];
  const inlines = [true];

  return {
    thumbnail: { url: imagePath('goddesses/' + data['id']) },
    title: resolve(data['name']),
    fields: values.map((currentValue, index) => {
      return { name: names[index], value: currentValue, inline: inlines[index] };
    })
  };
}

exports.run = (message, args) => {
  let embed = {};

  if (args.length === 0) {
    embed = goddessInstructions();
  } else {
    embed = args[0].startsWith('list') ? goddessList() : goddessInfo(args);
  }

  message.channel.send({ embed: embed });
  return true;
}

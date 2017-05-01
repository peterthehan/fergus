const co = require('../util/countInstances.js');

const goddess = require('../Decrypted/get_sister.json')['sister']
  .filter(element => co.countInstances(element['id'], '_') === 1);

const de = require('../util/deepCopy.js');
const fu = require('../util/fuzzy.js');
const im = require('../util/imagePath.js');
const li = require('../util/list.js');
const re = require('../util/resolve.js');

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
  return {
    description: li.list(goddess, 'name')
  };
}

goddessInfo = (name) => {
  const data = de.deepCopy(fu.fuzzy(name, goddess, 'name'));

  // parallel arrays
  const names = [
    re.resolve(data['skillname'])
  ];
  const values = [
    re.resolve(data['skilldesc'])
  ];
  const inlines = [true];

  return {
    thumbnail: {
      url: im.imagePath('goddesses/' + data['id'])
    },
    title: re.resolve(data['name']),
    fields: values.map((currentValue, index) => {
      return {
        name: names[index] === null ? '-' : names[index],
        value: currentValue === null ? '-' : currentValue,
        inline: inlines[index]
      };
    })
  };
}

exports.run = (message, args) => {
  const content = '';
  let embed = {};

  if (args.length === 0) {
    embed = goddessInstructions();
  } else {
    embed = args[0].startsWith('list') ? goddessList() : goddessInfo(args);
  }
  message.channel.sendMessage(content, { embed: embed });
}

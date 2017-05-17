const d = require('../data.js');
const goddess = d.goddess();

const embed = require('../util/embed.js');
const fuzzy = require('../util/fuzzy.js');
const imagePath = require('../util/imagePath.js');
const list = require('../util/list.js');
const resolve = require('../util/resolve.js');

goddessInstructions = () => {
  const names = ['list', '<name>',];
  const values = [
    'List all goddesses.\n*e.g. !goddess list*',
    'Get goddess information.\n*e.g. !goddess sera*',
  ];
  const inlines = [true, true,];

  return embed.process({
    title: '!goddess [list|<name>]',
    fields: embed.fields(names, values, inlines),
  });
}

goddessList = () => {
  return embed.process({ description: list(goddess, 'name'), });
}

goddessInfo = (name) => {
  const data = fuzzy(name, goddess, 'name');

  const names = [resolve(data['skillname']),];
  const values = [resolve(data['skilldesc']),];
  const inlines = [true,];

  return embed.process({
    title: resolve(data['name']),
    thumbnail: { url: imagePath('goddesses/' + data['id']), },
    fields: embed.fields(names, values, inlines),
  });
}

exports.run = (message, args) => {
  const e = !args.length
    ? goddessInstructions()
    : args[0].toLowerCase().startsWith('list')
        ? goddessList()
        : goddessInfo(args);

  message.channel.send({ embed: e, });
  return true;
}

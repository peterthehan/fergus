const d = require('../data.js');
const berry = d.berry();

const embed = require('../util/embed.js');
const extractGradeArg = require('../util/extractGradeArg.js');
const fuzzy = require('../util/fuzzy.js');
const imagePath = require('../util/imagePath.js');
const list = require('../util/list.js');
const resolve = require('../util/resolve.js');

berryInstructions = () => {
  const names = ['list', '<name>', '<star>',];
  const values = [
    'List all berries.\n*e.g. !berry list*',
    'Get berry information.\n*e.g. !berry almighty berry*',
    'Filter berries by <star>.\n*e.g. !berry list 6, !berry almighty berry 4*',
  ];
  const inlines = [true, true, true,];

  return embed.process({
    title: '!berry [list|<name>] [<star>]',
    fields: embed.fields(names, values, inlines),
  });
}

berryList = (grade = null) => {
  const data = !grade
    ? berry
    : berry.filter(element => element['grade'] === grade);

  return embed.process({
    title: !grade ? '' : `(${grade}★)`,
    description: list(data, 'name'),
  });
}

berryInfo = (name, grade = null) => {
  const data = !grade
    ? berry
    : berry.filter(element => element['grade'] === grade);

  const berryData = fuzzy(name, data, 'name');
  if (!berryData) { // edge case of nonexistent 5-star berries
    return embed.process({
      title: 'Error',
      description: `${grade}-star berries do not exist!`,
    });
  }

  const names = ['Sell', 'Eat price',];
  const values = [berryData['sell_price'], berryData['eat_price'],];
  const inlines = [true, true,];

  return embed.process({
    title: `${resolve(berryData['name'])} (${berryData['grade']}★)`,
    description:
      `${resolve(berryData['type_name'])}: ` +
      (berryData['add_stat_point'] <= 1
        ? (berryData['add_stat_point'] * 100).toFixed(1)
        : berryData['add_stat_point']) +
      (berryData['category'] === 'All' || berryData['type'].includes('Ratio')
        ? '%'
        : '') +
      `\nGreat rate: ${parseInt(berryData['great_prob'] * 100)}%`,
    thumbnail: { url: imagePath('berries/' + berryData['texture']), },
    fields: embed.fields(names, values, inlines),
  });
}

exports.run = (message, args) => {
  let e;
  if (!args.length) {
    e = berryInstructions();
  } else {
    const grade = extractGradeArg(args);
    e = args[0].toLowerCase().startsWith('list')
      ? berryList(grade)
      : berryInfo(args, grade);
  }

  message.channel.send({ embed: e, });
  return true;
}

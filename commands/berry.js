const d = require('../data.js');
const berry = d.berry();

const extractGradeArg = require('../util/extractGradeArg.js');
const fuzzy = require('../util/fuzzy.js');
const imagePath = require('../util/imagePath.js');
const list = require('../util/list.js');
const resolve = require('../util/resolve.js');

berryInstructions = () => {
  return {
    title: '!berry [list|<star>|<name>] [<star>]',
    fields: [
      {
        name: 'list',
        value: 'List all berries.\n*e.g. !berry list*',
        inline: true
      },
      {
        name: '<star>',
        value: 'List all <star> berries.\n*e.g. !berry 6*',
        inline: true
      },
      {
        name: '<name>',
        value: 'Get berry information.\n*e.g. !berry almighty berry*',
        inline: true
      },
      {
        name: '<star>',
        value: 'Filter berries by <star>\n*e.g. !berry almighty berry 4*',
        inline: true
      }
    ]
  };
}

berryList = () => {
  return { description: list(berry, 'name') };
}

berryGradeList = (grade) => {
  return {
    title: `(${grade}★)`,
    description: list(berry.filter(element => element['grade'] === grade), 'name')
  };
}

berryInfo = (name, grade = null) => {
  const data = grade === null ? berry : berry.filter(element => element['grade'] === grade);

  const berryData = fuzzy(name, data, 'name');

  if (berryData == null) {
    return { title: 'Error', description: `${grade}-star berries do not exist!` };
  }

  // parallel arrays
  const names = [
    'Sell',
    'Eat price',
  ];
  const values = [
    berryData['sell_price'],
    berryData['eat_price']
  ];
  const inlines = [true, true];

  const description =
    `${resolve(berryData['type_name'])}: ` +
    (berryData['add_stat_point'] <= 1 ? (berryData['add_stat_point'] * 100).toFixed(1) : berryData['add_stat_point']) +
    (berryData['category'] === 'All' || berryData['type'].includes('Ratio') ? '%' : '') +
    `\nGreat rate: ${parseInt(berryData['great_prob'] * 100)}%`;
  return {
    thumbnail: { url: imagePath('berries/' + berryData['texture']) },
    title: `${resolve(berryData['name'])} (${berryData['grade']}★)`,
    description: description,
    fields: values.map((currentValue, index) => {
      return { name: names[index], value: currentValue, inline: inlines[index] };
    })
  };
}

exports.run = (message, args) => {
  let embed = {};

  if (args.length === 0) {
    embed = berryInstructions();
  } else {
    if (args[0].startsWith('list')) {
      embed = berryList();
    } else if (!isNaN(parseInt(args[0]))) {
      args[0] = parseInt(args[0]);
      embed = args[0] >= 1 && args[0] <= 6
        ? berryGradeList(args[0])
        : { title: 'Error', description: `${args[0]}-star berries do not exist!` };
    } else {
      embed = berryInfo(args, extractGradeArg(args));
    }
  }

  message.channel.send({ embed: embed });
  return true;
}

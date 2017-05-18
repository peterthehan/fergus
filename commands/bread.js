const d = require('../data.js');
const bread = d.bread();

const embed = require('../util/embed.js');
const extractGradeArg = require('../util/extractGradeArg.js');
const fuzzy = require('../util/fuzzy.js');
const imagePath = require('../util/imagePath.js');
const list = require('../util/list.js');
const resolve = require('../util/resolve.js');

breadInstructions = () => {
  const names = ['list', '<name>', '<star>',];
  const values = [
    'List all bread.\n*e.g. !bread list*',
    'Get bread information.\n*e.g. !bread macaron*',
    'Filter bread by <star>.\n*e.g. !bread list 6, !bread donut 6*',
  ];
  const inlines = [true, true, true,];

  return embed.process({
    title: '!bread [list|<name>] [<star>]',
    fields: embed.fields(names, values, inlines),
  });
}

breadList = (grade = null) => {
  const data = !grade
    ? bread
    : bread.filter(element => element['grade'] === grade);

  return embed.process({
    title: !grade ? '' : `(${grade}★)`,
    description: list(data, 'name'),
  });
}

breadInfo = (name, grade = null) => {
  const data = !grade
    ? bread
    : bread.filter(element => element['grade'] === grade);

  const breadData = fuzzy(name, data, 'name');

  const names = ['Sell',];
  const values = [breadData['sellprice'],];
  const inlines = [true,];

  return embed.process({
    title: `${resolve(breadData['name'])} (${breadData['grade']}★)`,
    description:
      `Value: ${breadData['trainpoint']}\n` +
      `Great rate: ${parseInt(breadData['critprob'] * 100)}%`,
    thumbnail: { url: imagePath('bread/' + breadData['texture']), },
    fields: embed.fields(names, values, inlines),
  });
}

exports.run = (message, args) => {
  let e;
  if (!args.length) {
    e = breadInstructions();
  } else {
    const grade = extractGradeArg(args);
    e = args[0].toLowerCase().startsWith('list')
      ? breadList(grade)
      : breadInfo(args, grade);
  }

  message.channel.send({ embed: e, });
  return true;
}

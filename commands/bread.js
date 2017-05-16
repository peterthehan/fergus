const d = require('../data.js');
const bread = d.bread();

const embed = require('../util/embed.js');
const fuzzy = require('../util/fuzzy.js');
const imagePath = require('../util/imagePath.js');
const list = require('../util/list.js');
const resolve = require('../util/resolve.js');

breadInstructions = () => {
  const names = ['list', '<star>', '<name>',];
  const values = [
    'List all breads.\n*e.g. !bread list*',
    'List all <star> breads.\n*e.g. !bread 4*',
    'Get bread information.\n*e.g. !bread macaron*',
  ];
  const inlines = [true, true, true,];

  return embed.process({
    title: '!bread [list|<star>|<name>]',
    fields: embed.fields(names, values, inlines),
  });
}

breadList = () => {
  return embed.process({ description: list(bread, 'name'), });
}

breadGradeList = (grade) => {
  return embed.process({
    title: `(${grade}★)`,
    description:
        list(bread.filter(element => element['grade'] === grade), 'name'),
  });
}

breadInfo = (name) => {
  const data = fuzzy(name, bread, 'name');

  const names = ['Sell',];
  const values = [data['sellprice'],];
  const inlines = [true,];

  return embed.process({
    title: `${resolve(data['name'])} (${data['grade']}★)`,
    description:
        `Value: ${data['trainpoint']}\n` +
        `Great rate: ${parseInt(data['critprob'] * 100)}%`,
    thumbnail: { url: imagePath('bread/' + data['texture']), },
    fields: embed.fields(names, values, inlines),
  });
}

exports.run = (message, args) => {
  let e;
  if (args.length === 0) {
    e = breadInstructions();
  } else {
    if (args[0].startsWith('list')) {
      e = breadList();
    } else if (!isNaN(args[0])) {
      args[0] = parseInt(args[0]);
      e = args[0] >= 1 && args[0] <= 6
          ? breadGradeList(args[0])
          : embed.process({
              title: 'Error',
              description: `${args[0]}-star breads do not exist!`,
            });
    } else {
      e = breadInfo(args);
    }
  }

  message.channel.send({ embed: e, });
  return true;
}

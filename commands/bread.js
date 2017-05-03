const d = require('../data.js');
const bread = d.bread();

const fuzzy = require('../util/fuzzy.js');
const imagePath = require('../util/imagePath.js');
const list = require('../util/list.js');
const resolve = require('../util/resolve.js');

breadInstructions = () => {
  return {
    title: '!bread [list|<star>|<name>]',
    fields: [
      {
        name: 'list',
        value: 'List all breads.\n*e.g. !bread list*',
        inline: true
      },
      {
        name: '<star>',
        value: 'List all <star> breads.\n*e.g. !bread 4*',
        inline: true
      },
      {
        name: '<name>',
        value: 'Get bread information.\n*e.g. !bread macaron*',
        inline: true
      }
    ]
  };
}

breadList = () => {
  return { description: list(bread, 'name') };
}

breadGradeList = (grade) => {
  return {
    title: `(${grade}★)`,
    description: list(bread.filter(element => element['grade'] === grade), 'name')
  };
}

breadInfo = (name) => {
  const data = fuzzy(name, bread, 'name');

  // parallel arrays
  const names = ['Sell'];
  const values = [data['sellprice']];
  const inlines = [true];

  return {
    thumbnail: { url: imagePath('bread/' + data['texture']) },
    title: `${resolve(data['name'])} (${data['grade']}★)`,
    description: `Value: ${data['trainpoint']}\nGreat rate: ${parseInt(data['critprob'] * 100)}%`,
    fields: values.map((currentValue, index) => {
      return { name: names[index], value: currentValue, inline: inlines[index] };
    })
  };
}

exports.run = (message, args) => {
  let embed = {};

  if (args.length === 0) {
    embed = breadInstructions();
  } else {
    if (args[0].startsWith('list')) {
      embed = breadList();
    } else if (!isNaN(parseInt(args[0]))) {
      args[0] = parseInt(args[0]);
      embed = args[0] >= 1 && args[0] <= 6
        ? breadGradeList(args[0])
        : { title: 'Error', description: `${args[0]}-star breads do not exist!` };
    } else {
      embed = breadInfo(args);
    }
  }

  message.channel.send({ embed: embed });
  return true;
}

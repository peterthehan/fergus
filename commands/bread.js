const bread = require('../Decrypted/get_bread.json')['bread'];

const fu = require('../util/fuzzy.js');
const li = require('../util/list.js');
const re = require('../util/resolve.js');

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
  return {
    description: li.list(bread, 'name')
  };
}

breadGradeList = (grade) => {
  return {
    title: `(${grade}★)`,
    description: li.list(bread.filter(element => element['grade'] === grade), 'name')
  };
}

breadInfo = (name) => {
  const data = fu.fuzzy(name, bread, 'name');
  return {
    image: '',
    title: `${re.resolve(data['name'])} (${data['grade']}★)`,
    fields: [
      {
        name: 'Value',
        value: data['trainpoint'],
        inline: true
      },
      {
        name: 'Great rate',
        value: `${data['critprob'] * 100}%`,
        inline: true
      },
      {
        name: 'Sell',
        value: data['sellprice'],
        inline: true
      }
    ]
  };
}

exports.run = (message, args) => {
  const content = '';
  let embed = {};

  if (args.length === 0) {
    embed = breadInstructions();
  } else {
    if (args[0].startsWith('list')) {
      embed = breadList();
    } else if (!isNaN(parseInt(args[0]))) {
      args[0] = parseInt(args[0]); // for js' weak typing
      if (args[0] >= 1 && args[0] <= 6) {
        embed = breadGradeList(args[0]);
      } else {
        embed = { title: 'Error', description: `${args[0]}-star breads do not exist!` };
      }
    } else {
      embed = breadInfo(args);
    }
  }
  message.channel.sendMessage(content, { embed: embed });
}

const bread = require('../cqdb/get_bread.json')['bread'];

const error = require('../util/error.js');
const fuzzy = require('../util/fuzzy.js');
const list = require('../util/list.js');
const resolve = require('../util/resolve.js');
const stars = require('../util/stars.js');

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
        value: 'List all <star> breads\n*e.g. !bread 4*',
        inline: true
      },
      {
        name: '<name>',
        value: 'Get bread information\n*e.g. !bread macaron*',
        inline: true
      }
    ]
  };
}

breadList = () => {
  return {
    description: list.list(bread, 'name')
  };
}

breadStarList = (star) => {
  return {
    description: list.list(bread.filter(element => element['grade'] === star), 'name')
  };
}

breadInfo = (args) => {
  const data = fuzzy.fuzzy(args, bread, 'name');
  return {
    image: '',
    title: `${resolve.resolve(data, 'name')} (${stars.stars(data['grade'])})`,
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

module.exports.run = (message, args) => {
  let content = '';
  let embed = {};
  if (args.length === 0) {
    embed = breadInstructions();
  } else {
    if (args[0].startsWith('list')) {
      embed = breadList();
    } else if (!isNaN(parseInt(args[0]))) {
      args[0] = parseInt(args[0]); // for js' weak typing
      if (args[0] >= 1 && args[0] <= 6) {
        embed = breadStarList(args[0]);
      } else {
        embed = error.error(args[0], '-star breads do not exist!');
      }
    } else {
      embed = breadInfo(args);
    }
  }
  message.channel.sendMessage(content, { embed: embed });
}

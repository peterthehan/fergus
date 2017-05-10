const d = require('../data.js');
const weapon = d.weapon();

const deepCopy = require('../util/deepCopy.js');
const fuzzy = require('../util/fuzzy.js');
const imagePath = require('../util/imagePath.js');
const list = require('../util/list.js');
const resolve = require('../util/resolve.js');

weaponInstructions = () => {
  return {
    title: '!weapon [list|<star>|<name>]', //'!weapon [list|<star>|<category>|<name>]',
    fields: [
      {
        name: 'list',
        value: 'List all weapons.\n*e.g. !weapon list*',
        inline: true
      },
      {
        name: '<star>',
        value: 'List all <star> weapons.\n*e.g. !weapon 4*',
        inline: true
      },
      /*TODO {
        name: '<category>',
        value: 'List all <category> weapons.\n*e.g. !weapon bow*',
        inline: true
      },*/
      {
        name: '<name>',
        value: 'Get weapon information.\n*e.g. !weapon red falchion*',
        inline: true
      }
    ]
  };
}

weaponList = () => {
  return { description: list(weapon, 'name') };
}

weaponGradeList = (grade) => {
  return {
    title: `(${grade}★)`,
    description: list(weapon.filter(element => element['grade'] === grade), 'name')
  };
}

weaponInfo = (name) => {
  const data = deepCopy(fuzzy(name, weapon, 'name'));

  // key does not resolve as-is, modification necessary
  const conv = [data['convert_slot_1'], data['convert_slot_2'], data['convert_slot_3']]
    .map(currentValue => resolve(modifyKey(currentValue)))
    .filter(element => element !== null);

  // parallel arrays
  const names = [
    'Category',
    'Range',
    'Atk. Power',
    'Atk. Speed',
    'Conversions',
    'How to get'
  ];
  const values = [ // key does not resolve as-is, modification necessary
    resolve('TEXT_WEAPON_CATE_' + data['categoryid'].substring(4)),
    data['range'].toString(),
    data['attdmg'].toString(),
    data['attspd'].toString(),
    conv.length === 0 ? null : conv.join(', '),
    data['howtoget'] === null ? null : data['howtoget'].join(', ')
  ];
  const inlines = [true, true, true, true, false, false];

  return {
    thumbnail: { url: imagePath('weapons/' + data['face_tex']) },
    title: `${resolve(data['name'])} (${data['grade']}★)`,
    fields: values.map((currentValue, index) => {
      return {
        name: names[index],
        value: currentValue === null ? '-' : currentValue,
        inline: inlines[index]
      };
    })
  };
}

modifyKey = (value) => {
  const prefix = 'TEXT_WEAPON_CONVERT_INFO_';
  if (value === 'ATTACK') {
    return prefix + 'ATK';
  } else if (value === 'DEFENSE') {
    return prefix + 'DEF';
  } else if (value === 'UTILITY') {
    return prefix + 'UTL';
  }
  return null;
}

exports.run = (message, args) => {
  let embed = {};

  if (args.length === 0) {
    embed = weaponInstructions();
  } else {
    if (args[0].startsWith('list')) {
      embed = weaponList();
    } else if (!isNaN(parseInt(args[0]))) {
      args[0] = parseInt(args[0]);
      embed = args[0] >= 1 && args[0] <= 6
        ? weaponGradeList(args[0])
        : { title: 'Error', description: `${args[0]}-star weapons do not exist!` };
    } else {
      embed = weaponInfo(args);
    }
  }

  message.channel.send({ embed: embed });
  return true;
}

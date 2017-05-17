const d = require('../data.js');
const weapon = d.weapon();

const embed = require('../util/embed.js');
const fuzzy = require('../util/fuzzy.js');
const imagePath = require('../util/imagePath.js');
const list = require('../util/list.js');
const resolve = require('../util/resolve.js');

weaponInstructions = () => {
  const names = ['list', '<star>', /*<category>,*/ '<name>',];
  const values = [
    'List all weapons.\n*e.g. !weapon list*',
    'List all <star> weapons.\n*e.g. !weapon 4*',
    //TODO'List all <category> weapons.\n*e.g. !weapon bow*',
    'Get weapon information.\n*e.g. !weapon red falchion*',
  ];
  const inlines = [true, true, true, true,];

  return embed.process({
    title: '!weapon [list|<star>|<name>]',
    fields: embed.fields(names, values, inlines),
  });
}

weaponList = () => {
  return embed.process({ description: list(weapon, 'name'), });
}

weaponGradeList = (grade) => {
  return embed.process({
    title: `(${grade}★)`,
    description:
      list(weapon.filter(element => element['grade'] === grade), 'name'),
  });
}

weaponInfo = (name) => {
  const data = fuzzy(name, weapon, 'name');

  // key does not resolve as-is, modification necessary
  const conv = [
    data['convert_slot_1'],
    data['convert_slot_2'],
    data['convert_slot_3'],
  ]
    .map(currentValue => resolve(modifyKey(currentValue)))
    .filter(element => element);

  const names = [
    'Category',
    'Range',
    'Atk. Power',
    'Atk. Speed',
    'Conversions',
    'How to get',
  ];
  const values = [ // key does not resolve as-is, modification necessary
    resolve('TEXT_WEAPON_CATE_' + data['categoryid'].substring(4)),
    data['range'].toString(),
    data['attdmg'].toString(),
    data['attspd'].toString(),
    !conv.length ? null : conv.join(', '),
    !data['howtoget'] ? null : data['howtoget'].join(', '),
  ];
  const inlines = [true, true, true, true, false, false,];

  return embed.process({
    title: `${resolve(data['name'])} (${data['grade']}★)`,
    thumbnail: { url: imagePath('weapons/' + data['face_tex']) },
    fields: embed.fields(
      names,
      values.map(currentValue => !currentValue ? '-' : currentValue),
      inlines
    ),
  });
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
  let e;
  if (!args.length) {
    e = weaponInstructions();
  } else if (args[0].toLowerCase().startsWith('list')) {
    e = weaponList();
  } else if (!isNaN(args[0])) {
    args[0] = parseInt(args[0]);
    e = args[0] >= 1 && args[0] <= 6
      ? weaponGradeList(args[0])
      : embed.process({
          title: 'Error',
          description: `${args[0]}-star weapons do not exist!`,
        });
  } else {
    e = weaponInfo(args);
  }

  message.channel.send({ embed: e, });
  return true;
}

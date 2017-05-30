const d = require('../data.js');
const weapon = d.weapon();

const embed = require('../util/embed.js');
const extractGradeArg = require('../util/extractGradeArg.js');
const fuzzy = require('../util/fuzzy.js');
const imagePath = require('../util/imagePath.js');
const list = require('../util/list.js');
const resolve = require('../util/resolve.js');

weaponInstructions = () => {
  const names = ['list', '<name>', '<star>',];
  const values = [
    'List all weapons.\n*e.g. !weapon list*',
    'Get weapon information.\n*e.g. !weapon answerer*',
    'Filter weapons by <star>.\n*e.g. !weapon list 6, !weapon sword 6*',
  ];
  const inlines = [true, true, true,];

  return embed.process({
    title: '!weapon [list|<name>] [<star>]',
    fields: embed.fields(names, values, inlines),
  });
}

weaponList = (grade = null) => {
  const data = !grade
    ? weapon
    : weapon.filter(element => element['grade'] === grade);

  return embed.process({
    title: !grade ? '' : `(${grade}★)`,
    description: list(data, 'name'),
  });
}

weaponInfo = (name, grade = null) => {
  const data = !grade
    ? weapon
    : weapon.filter(element => element['grade'] === grade);

  const weaponData = fuzzy(name, data, 'name');

  // key does not resolve as-is, modification necessary
  const conv = [
    weaponData['convert_slot_1'],
    weaponData['convert_slot_2'],
    weaponData['convert_slot_3'],
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
    resolve('TEXT_WEAPON_CATE_' + weaponData['categoryid'].substring(4)),
    weaponData['range'].toString(),
    weaponData['attdmg'].toString(),
    weaponData['attspd'].toString(),
    !conv.length ? null : conv.join(', '),
    !weaponData['howtoget'] ? null : weaponData['howtoget'].join(', '),
  ];
  const inlines = [true, true, true, true, false, false,];

  return embed.process({
    title: `${resolve(weaponData['name'])} (${weaponData['grade']}★)`,
    thumbnail: { url: imagePath('weapons/' + weaponData['face_tex']) },
    fields: embed.fields(
      names,
      values.map(currentValue => !currentValue ? '-' : currentValue),
      inlines
    ),
  });
}

// helper function
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
  } else {
    const grade = extractGradeArg(args);
    e = args[0].toLowerCase().startsWith('list')
      ? weaponList(grade)
      : weaponInfo(args, grade);
  }

  message.channel.send({ embed: e, });
}

const weapon = require('../Decrypted/get_weapon.json')['weapon']
  .filter(element => element['type'] === 'HERO' && element['reqhero'] === null && element['howtoget'] !== null); // 99 + 6 + 6 = 111

const de = require('../util/deepCopy.js');
const fu = require('../util/fuzzy.js');
const im = require('../util/imagePath.js');
const li = require('../util/list.js');
const re = require('../util/resolve.js');

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
      /*{
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
  const temp = li.list(weapon, 'name').split(', ');
  console.log(weapon.map((i, index) => i['skin_tex'] + ' ' + temp[index] + '\n').join('\n'));
  return {
    description: li.list(weapon, 'name')
  };
}

weaponGradeList = (grade) => {
  return {
    title: `(${grade}★)`,
    description: li.list(weapon.filter(element => element['grade'] === grade), 'name')
  };
}

/*weaponCategoryList = (category) => {
  return {
  };
}*/

weaponInfo = (name) => {
  const data = de.deepCopy(fu.fuzzy(name, weapon, 'name'));

  data['categoryid'] = 'TEXT_WEAPON_CATE_' + data['categoryid'].substring(4);
  const conv = [data['convert_slot_1'], data['convert_slot_2'], data['convert_slot_3']]
    .map(currentValue => re.resolve(modifyKey(currentValue)))
    .filter(element => element !== null);

  // parallel arrays
  const names = [
    'Category',
    'Atk. Power',
    'Atk. Speed',
    'Range',
    'Conversions',
    'How to get'
  ];
  const values = [
    re.resolve(data['categoryid']),
    data['attdmg'].toString(),
    data['attspd'].toString(),
    data['range'].toString(),
    conv.length === 0 ? null : conv.join(', '),
    data['howtoget'] === null ? null : data['howtoget'].join(', ')
  ];
  const inlines = [true, true, true, true, true, false];

  return {
    thumbnail: {
      url: im.imagePath('weapons/' + visualData['face_tex'])
    },
    title: `${re.resolve(data['name'])} (${data['grade']}★)`,
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
  let conversion;
  if (value === 'ATTACK') {
    conversion = 'ATK';
  } else if (value === 'DEFENSE') {
    conversion = 'DEF';
  } else if (value === 'UTILITY') {
    conversion = 'UTL';
  } else {
    return null;
  }
  return 'TEXT_WEAPON_CONVERT_INFO_' + conversion;
}

exports.run = (message, args) => {
  const content = '';
  let embed = {};

  if (args.length === 0) {
    embed = weaponInstructions();
  } else {
    if (args[0].startsWith('list')) {
      embed = weaponList();
    } else if (!isNaN(parseInt(args[0]))) {
      args[0] = parseInt(args[0]); // for js' weak typing
      if (args[0] >= 1 && args[0] <= 6) {
        embed = weaponGradeList(args[0]);
      } else {
        embed = { title: 'Error', description: `${args[0]}-star weapons do not exist!` };
      }
    } else {
      embed = weaponInfo(args);
    }
  }
  message.channel.sendMessage(content, { embed: embed });
}

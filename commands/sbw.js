const character_visual = require('../Decrypted/get_character_visual.json')['character_visual'].filter(element => element['type'] === 'HERO'); // 662
const sbw = require('../Decrypted/get_weapon.json')['weapon']
  .filter(element => element['type'] === 'HERO' && element['reqhero'] !== null && element['howtoget'] !== null); // 48 * 6 + 3 + 16 * 6 + 3 = 378

const extractGrade = require('../util/extractGrade.js');
const filterCharacterVisual = require('../util/filterCharacterVisual.js');
const fuzzy = require('../util/fuzzy.js');
const imagePath = require('../util/imagePath.js');
const resolve = require('../util/resolve.js');

sbwInstructions = () => {
  return {
    title: '!sbw [<name>] [<star>]',
    fields: [
      {
        name: '<name>',
        value: `Get sbw information.\n*e.g. !sbw lee*`,
        inline: true
      },
      {
        name: '<star>',
        value: 'Filter heroes by <star>.\n*e.g. !sbw lee 6*',
        inline: true
      }
    ]
  };
}

sbwInfo = (name, grade = null) => {
  const data = grade === null || grade <= 3
    ? character_visual.filter(element => !(element['rarity'] === 'DESTINY' && ['_1_', '_2_', '_3_'].includes(element['default_stat_id'].match(/_\d_/)[0])))
    : filterCharacterVisual(grade);

  const visualData = fuzzy(name, data, 'name');
  const sbwData = (grade === 5
    ? sbw.filter(element => parseInt(element['grade']) === 5 && element['reqhero'].includes(visualData['id']))
    : sbw.filter(element => element['reqhero_ref'] === visualData['id']))[0];

  if (sbwData == null) {
    return { title: 'Error', description: 'Hero does not have an sbw yet!' };
  }

  // parallel arrays
  const names = [
    'Category',
    'Range',
    'Atk. Power',
    'Atk. Speed',
    'How to get'
  ];
  const values = [ // key does not resolve as-is, modification necessary
    resolve('TEXT_WEAPON_CATE_' + sbwData['categoryid'].substring(4)),
    sbwData['range'].toString(),
    sbwData['attdmg'].toString(),
    sbwData['attspd'].toString(),
    sbwData['howtoget'] === null ? null : sbwData['howtoget'].join(', ')
  ];
  const inlines = [true, true, true, true, false];

  return {
    thumbnail: { url: imagePath('sbws/' + sbwData['face_tex']) },
    title: `${resolve(sbwData['name'])} (${sbwData['grade']}★)`,
    description: resolve(sbwData['desc']),
    fields: values.map((currentValue, index) => {
      return {
        name: names[index],
        value: currentValue === null ? '-' : currentValue,
        inline: inlines[index]
      };
    })
  };
}

exports.run = (message, args) => {
  const embed = args.length === 0 ? sbwInstructions() : sbwInfo(args, extractGrade(args));
  message.channel.send({ embed: embed });
  return true;
}

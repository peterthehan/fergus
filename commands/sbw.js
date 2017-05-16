const d = require('../data.js');
const character_visual = d.character_visual();
const sbw = d.sbw();

const extractGrade = require('../util/extractGrade.js');
const extractGradeArg = require('../util/extractGradeArg.js');
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
        value: 'Filter heroes by <star>.\n*e.g. !sbw lee 4*',
        inline: true
      }
    ]
  };
}

sbwInfo = (name, grade = null) => {
  const data = grade === null || grade <= 3
    ? filterCharacterVisual('max')
    : filterCharacterVisual(grade);

  const visualData = fuzzy(name, data, 'name');
  // resolve edge case between grade 5 and element['reqhero_ref']
  const sbwData = (grade === 5 || (grade === null && extractGrade(visualData['id']) === 5)
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
  const embed = args.length === 0 ? sbwInstructions() : sbwInfo(args, extractGradeArg(args));
  message.channel.send({ embed: embed });
  return true;
}

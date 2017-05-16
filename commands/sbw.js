const d = require('../data.js');
const character_visual = d.character_visual();
const sbw = d.sbw();

const embed = require('../util/embed.js');
const extractGrade = require('../util/extractGrade.js');
const extractGradeArg = require('../util/extractGradeArg.js');
const filterCharacterVisual = require('../util/filterCharacterVisual.js');
const fuzzy = require('../util/fuzzy.js');
const imagePath = require('../util/imagePath.js');
const resolve = require('../util/resolve.js');

sbwInstructions = () => {
  const names = ['<name>', '<star>',];
  const values = [
    `Get sbw information.\n*e.g. !sbw lee*`,
    'Filter heroes by <star>.\n*e.g. !sbw lee 4*',
  ];
  const inlines = [true, true,];

  return embed.process({
    title: '!sbw [<name>] [<star>]',
    fields: embed.fields(names, values, inlines),
  });
}

sbwInfo = (name, grade = null) => {
  const data = grade === null || grade <= 3
      ? filterCharacterVisual('max')
      : filterCharacterVisual(grade);
  const visualData = fuzzy(name, data, 'name');
  // resolve edge case between grade 5 and element['reqhero_ref']
  const sbwData =
    (grade === 5 || (grade === null && extractGrade(visualData['id']) === 5)
        ? sbw.filter(element => {
            return parseInt(element['grade']) === 5
                && element['reqhero'].includes(visualData['id']);
          })
        : sbw.filter(element => {
            return element['reqhero_ref'] === visualData['id'];
          })
    )[0];

  if (sbwData == null) {
    return embed.process({
      title: 'Error',
      description: 'Hero does not have an sbw yet!',
    });
  }

  const names = [
    'Category',
    'Range',
    'Atk. Power',
    'Atk. Speed',
    'How to get',
  ];
  const values = [ // key does not resolve as-is, modification necessary
    resolve('TEXT_WEAPON_CATE_' + sbwData['categoryid'].substring(4)),
    sbwData['range'].toString(),
    sbwData['attdmg'].toString(),
    sbwData['attspd'].toString(),
    sbwData['howtoget'] === null ? null : sbwData['howtoget'].join(', '),
  ];
  const inlines = [true, true, true, true, false,];

  return embed.process({
    title: `${resolve(sbwData['name'])} (${sbwData['grade']}★)`,
    description: resolve(sbwData['desc']),
    thumbnail: { url: imagePath('sbws/' + sbwData['face_tex']), },
    fields: embed.fields(
      names,
      values.map(currentValue => currentValue === null ? '-' : currentValue),
      inlines
    ),
  });
}

exports.run = (message, args) => {
  const e = args.length === 0
      ? sbwInstructions()
      : sbwInfo(args, extractGradeArg(args));

  message.channel.send({ embed: e, });
  return true;
}

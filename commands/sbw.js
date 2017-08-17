const d = require('../data.js');
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
  const data = filterCharacterVisual(!grade || grade <= 3 ? 6 : grade);

  const visualData = fuzzy(name, data, 'name');
  // resolve edge case between grade 5 and element['reqhero_ref']
  const sbwData =
    (grade === 5 || (!grade && extractGrade(visualData['id']) === 5)
      ? sbw.filter(element => {
          return parseInt(element['grade']) === 5
            && element['reqhero'].includes(visualData['id']);
        })
      : sbw.filter(element => {
          return element['reqhero_ref'] === visualData['id'];
        })
    )[0];

  if (!sbwData) {
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
  ];
  const values = [ // key does not resolve as-is, modification necessary
    resolve('TEXT_WEAPON_CATE_' + sbwData['categoryid'].substring(4)),
    sbwData['range'].toString(),
    sbwData['attdmg'].toString(),
    sbwData['attspd'].toString(),
  ];
  const inlines = [true, true, true, true,];

  return embed.process({
    title: `${resolve(sbwData['name'])} (${sbwData['grade']}★)`,
    description: resolve(sbwData['desc']),
    thumbnail: { url: imagePath('sbws/' + sbwData['image']), },
    fields: embed.fields(
      names,
      values.map(currentValue => !currentValue ? '-' : currentValue),
      inlines
    ),
  });
}

exports.run = (message, args) => {
  //console.log(sbw.map(i => resolve(i.name) + ' ' + i.skin_tex).join(', '));
  const e = !args.length
    ? sbwInstructions()
    : sbwInfo(args, extractGradeArg(args));

  message.channel.send({ embed: e, });
}

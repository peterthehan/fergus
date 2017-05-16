const d = require('../data.js');
const character_stat = d.character_stat();
const character_visual = d.character_visual();

const extractGradeArg = require('../util/extractGradeArg.js');
const filterCharacterVisual = require('../util/filterCharacterVisual.js');
const fuzzy = require('../util/fuzzy.js');
const imagePath = require('../util/imagePath.js');
const resolve = require('../util/resolve.js');

heroInstructions = () => {
  return {
    title: '!hero [<name>] [<star>]',
    fields: [
      {
        name: '<name>',
        value: 'Get hero information.\n*e.g. !hero lee*',
        inline: true
      },
      {
        name: '<star>',
        value: 'Filter heroes by <star>.\n*e.g. !hero lee 4*',
        inline: true
      }
    ]
  };
}

heroInfo = (name, grade = null) => {
  const data = grade === null ? filterCharacterVisual('max') : filterCharacterVisual(grade);

  const visualData = fuzzy(name, data, 'name');
  const statData = character_stat.filter(element => element['id'] === visualData['default_stat_id'])[0];

  /*TODO visualData['howtoget'] = visualData['howtoget'].map(currentValue => {
    if(currentValue.startsWith('STAGE')) {
      return 'TEXT_' + currentValue + '_NAME';
    } else {
      return 'TEXT_HOW_TO_GET_' + currentValue;
    }
  });*/

  // rarity
  let rarity;
  if (visualData['rarity'] === 'LEGENDARY') {
    rarity = visualData['isgachagolden'] ? 'IN_GACHA' : 'LAGENDARY';
  } else {
    rarity = visualData['rarity'];
  }

  // parallel arrays
  const names = [
    'Class',
    'Domain',
    'Gender',
    //'Job',
    'Rarity',
    'How to get'
  ];
  const values = [ // key does not resolve as-is, modification necessary
    resolve('TEXT_CLASS_' + visualData['classid'].substring(4)),
    resolve(visualData['domain'] === 'NONEGROUP' ? 'TEXT_CHAMP_DOMAIN_' + visualData['domain'] + '_NAME' : 'TEXT_CHAMPION_DOMAIN_' + visualData['domain']),
    resolve('TEXT_EXPLORE_TOOLTIP_GENDER_' + visualData['gender']),
    //visualData['job'],
    resolve('TEXT_CONFIRM_SELL_' + rarity + '_HERO'),
    visualData['howtoget'] === null ? null : visualData['howtoget'].join(', ')
  ];
  const inlines = [true, true, true, /*true,*/ true, false];

  return {
    thumbnail: { url: imagePath('heroes/' + visualData['face_tex']) },
    title: `${resolve(visualData['name'])} (${statData['grade']}★)`,
    description: resolve(visualData['desc']),
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
  const embed = args.length === 0 ? heroInstructions() : heroInfo(args, extractGradeArg(args));
  message.channel.send({ embed: embed });
  return true;
}

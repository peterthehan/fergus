const character_visual = require('../Decrypted/get_character_visual.json')['character_visual'].filter(element => element['type'] === 'HERO'); // 662
const skill = require('../Decrypted/get_spskill.json')['spskill'];

const extractGradeArg = require('../util/extractGradeArg.js');
const filterCharacterVisual = require('../util/filterCharacterVisual.js');
const fuzzy = require('../util/fuzzy.js');
const imagePath = require('../util/imagePath.js');
const resolve = require('../util/resolve.js');

skillInstructions = () => {
  return {
    title: '!skill [<name>] [<level>]',
    fields: [
      {
        name: '<name>',
        value: 'Get skill information.\n*e.g. !skill wind slash*',
        inline: true
      },
      {
        name: '<level>',
        value: 'Filter skills by <level>.\n*e.g. !skill wind slash 5*',
        inline: true
      }
    ]
  };
}

skillInfo = (name, grade = null) => {
  const data = grade === null ? skill : skill.filter(element => element['level'] === grade);

  const skillData = fuzzy(name, data, 'name');

  // parallel arrays
  const names = [
    'Class',
    'Type',
    'Cost',
    'Great rate',
    'Unlock condition'
  ];
  const values = [ // key does not resolve as-is, modification necessary
    resolve('TEXT_CLASS_' + skillData['class'].substring(4)),
    resolve(skillData['simpledesc']),
    skillData['cost'].map(currentValue => `${resolve('TEXT_' + currentValue['type'])}: ${currentValue['value']}`).join('\n'),
    skillData['huge'] === -1 ? '-' : `${parseInt(skillData['huge'] * 100)}%`,
    unlockCondition(skillData['unlockcond'])
  ];
  const inlines = [true, true, true, true, false];

  return {
    thumbnail: { url: imagePath('skills/' + skillData['icon']) },
    title: `${resolve(skillData['name'])} (Lv. ${skillData['level']}${skillData['unlockcond']['next_id'] === 'MAX' ? ', Max' : ''})`,
    description: resolve(skillData['desc']),
    fields: values.map((currentValue, index) => {
      return {
        name: names[index],
        value: currentValue === null ? '-' : currentValue,
        inline: inlines[index] };
    })
  };
}

unlockCondition = (data) => {
  if (data['type'] === 'NONE') {
    return 'None';
  } else if (data['type'] === 'SPECIFIC') {
    let hero;
    if ('type_target' in data) { // acquire specific hero
      hero = resolve(
        character_visual
          .filter(element => element['id'] === data['type_target'])[0]['name']
      );
    } else if ('type_target_list' in data) { // acquire list of specific heroes
      hero = character_visual
        .filter(element => data['type_target_list'].includes(element['id']))
        .map(currentValue => resolve(currentValue['name']))
        .join(', ');
    }
    return resolve(data['type_text'])
      .replace(/Acquired/, 'Acquire')
      .replace(/\{0\}/, hero);
  } else if (data['type'] === 'SEPARATE') { // acquire x amount of class heroes
    return resolve(data['type_text'])
      .replace(/Acquired/, 'Acquire')
      .replace(/\{1\}/, data['type_value'])
      .replace(/\{0\}/, resolve('TEXT_CLASS_' + data['type_target'].substring(4)).toLowerCase() + 's');
  } else if (data['type'] === 'ONLY_HUGE') {
    return `Get 'Great Success!'`;
  }
  return '-'; // should never reach here
}

exports.run = (message, args) => {
  const embed = args.length === 0 ? skillInstructions() : skillInfo(args, extractGradeArg(args, 5));
  message.channel.send({ embed: embed });
  return true;
}

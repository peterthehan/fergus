const d = require('../data.js');
const character_visual = d.character_visual();
const skill = d.skill();

const embed = require('../util/embed.js');
const extractGradeArg = require('../util/extractGradeArg.js');
const filterCharacterVisual = require('../util/filterCharacterVisual.js');
const fuzzy = require('../util/fuzzy.js');
const imagePath = require('../util/imagePath.js');
const list = require('../util/list.js');
const random = require('../util/random.js');
const removeDuplicates = require('../util/removeDuplicates.js');
const resolve = require('../util/resolve.js');
const toTitleCase = require('../util/toTitleCase.js');

skillInstructions = () => {
  const names = ['list', '<name>', '<level>',];
  const values = [
    'List all skills.\n*e.g. !skill list*',
    'Get skill information.\n*e.g. !skill wind slash*',
    'Filter skills by <level>.\n*e.g. !skill wind slash 1*',
  ];
  const inlines = [true, true, true,];

  return embed.process({
    title: '!skill [list|<name>] [<level>]',
    thumbnail: { url: imagePath(`etc/skill_${random(1, 2)}`), },
    fields: embed.fields(names, values, inlines),
  });
}

skillList = () => {
  return embed.process({
    description: removeDuplicates(list(skill, 'name').split(', ')).join(', '),
  });
}

skillInfo = (name, grade = null) => {
  const data = !grade
    ? skill.filter(element => element['unlockcond']['next_id'] === 'MAX')
    : skill.filter(element => element['level'] === grade);
  const skillData = fuzzy(name, data, 'name');

  // edge case with skill classes
  let className;
  if (skillData.class === 'KOF') {
    className = skillData.class;
  } else if (skillData.class === 'CLA_OBJECT') {
    className = 'Unique';
  } else {
    className = resolve('TEXT_CLASS_' + skillData.class.substring(4));
  }

  // edge case with captain skill
  const cost = skillData.name === 'TEXT_SKILL_PA_CAPTAIN_NAME'
    ? skillData.cost_json.map(j => `${toTitleCase(j.type)}: ${j.value}`).join(', ')
    : skillData.cost_json.map(j => `${toTitleCase(j.Cost_Type.replace('ITEM_', ''))}: ${j.Cost_Amount}`).join(', ');


  const names = ['Class', 'Type', 'Cost', 'Great rate', 'Unlock condition',];
  const values = [ // key does not resolve as-is, modification necessary
    className,
    resolve(skillData['simpledesc']),
    cost,
    skillData['huge'] === -1 ? '-' : `${parseInt(skillData['huge'] * 100)}%`,
    unlockCondition(skillData['unlockcond']),
  ];
  const inlines = [true, true, true, true, false];

  return embed.process({
    title:
      `${resolve(skillData['name'])} (Lv. ${skillData['level']}` +
      `${skillData['unlockcond']['next_id'] === 'MAX' ? ', Max' : ''})`,
    description: resolve(skillData['desc']),
    thumbnail: { url: imagePath('skills/' + skillData['icon']), },
    fields: embed.fields(
      names,
      values.map(currentValue => !currentValue ? '-' : currentValue),
      inlines
    ),
  });
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
  const e = !args.length
    ? skillInstructions()
    : args[0].toLowerCase().startsWith('list')
        ? skillList()
        : skillInfo(args, extractGradeArg(args, 5));

  message.channel.send({ embed: e, });
}

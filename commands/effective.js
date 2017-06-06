const d = require('../data.js');
const character_addstatmax = d.character_addstatmax();
const character_stat = d.character_stat();

const defenseModifier = require('../util/defenseModifier.js');
const embed = require('../util/embed.js');
const filterCharacterVisual = require('../util/filterCharacterVisual.js');
const fuzzy = require('../util/fuzzy.js');
const getStat = require('../util/getStat.js');
const imagePath = require('../util/imagePath.js');
const parseTrainingArgs = require('../util/parseTrainingArgs.js');
const resolve = require('../util/resolve.js');

effectiveInstructions = () => {
  const names = ['<name>', '<star>', '<level> <bread> <berry>', '\u200b',];
  const values = [
    `Get effective stats information.\n*e.g. !effective lee*`,
    'Filter heroes by <star>.\n*e.g. !effective lee 4*',
    'Modify training parameters. If not specified, defaults to max form.\n' +
      '*e.g. !effective lee 6 60 5 false*',
    `Note: Calculations do not factor in a ` +
      `hero's block, passive, ring, sbw, skill, skin, ` +
      'or any accuracy or defense penetration.' +
      '```js\n' +
      'damageReduction = 1 - 1 / (1 + defense * 0.0034)\n' +
      'hpEffective = hp / (1 - damageReduction) / (1 - eva)\n' +
      'haEffective = ha * ((1 - cc) + (1 + cd) * cc)\n' +
      '```',
  ];
  const inlines = [true, true, true, false,];

  return embed.process({
    title: '!effective [<name>] [<star>] [<level> <bread> <berry>]',
    fields: embed.fields(names, values, inlines),
  });
}

effectiveInfo = (name, training) => {
  const data = filterCharacterVisual(!training[0] ? 'max' : training[0]);

  const visualData = fuzzy(name, data, 'name');
  const statData = character_stat
    .filter(element => element['id'] === visualData['default_stat_id'])[0];

  const grade = statData['grade'];
  const berry = training[3];
  let addStatMaxData = grade === 6 && (berry === null || berry)
    ? character_addstatmax
      .filter(element => element['id'] === statData['addstat_max_id'])[0]
    : null;

  // resolve battleloid edge case
  if (!addStatMaxData) {
    addStatMaxData = null;
  }

  const level = !training[1] || training[1] > grade * 10 || training[1] < 1
    ? grade * 10
    : training[1];
  const bread = !training[2] || training[2] > grade - 1 || training[2] < 0
    ? grade - 1
    : training[2];

  // parallel arrays
  const addBerry = !addStatMaxData
    ? [0, 0, 0, 0, 0, 0, 0,]
    : [
        addStatMaxData['hp'],
        addStatMaxData['attack_power'],
        addStatMaxData['critical_chance'],
        addStatMaxData['critical_damage'],
        addStatMaxData['armor'],
        addStatMaxData['resistance'],
        addStatMaxData['dodge'],
      ];
  const stats = [
    getStat(statData['initialhp'], statData['growthhp'], level, bread),
    getStat(statData['initialattdmg'], statData['growthattdmg'], level, bread),
    statData['critprob'],
    statData['critpower'],
    getStat(statData['defense'], statData['growthdefense'], level, bread),
    getStat(statData['resist'], statData['growthresist'], level, bread),
    statData['dodgerate'],
  ].map((currentValue, index) => {
    return currentValue + addBerry[index];
  });

  const rounding = [2, 2, 1, 1, 1,]; // match game's decimal places
  const names = [
    'Physical Damage Reduction',
    'Magical Damage Reduction',
    'Effective Physical HP',
    'Effective Magical HP',
    'Effective Atk. Power',
  ];
  const values = [
    defenseModifier(stats[4]),
    defenseModifier(stats[5]),
    stats[0] * defenseModifier(stats[4], false) / (1 - stats[6]),
    stats[0] * defenseModifier(stats[5], false) / (1 - stats[6]),
    stats[1] * ((1 - stats[2]) + (1 + stats[3]) * stats[2]),
  ].map((currentValue, index) => {
    return currentValue.toFixed(rounding[index]);
  });
  const inlines = [true, true, true, true, true,];

  return embed.process({
    title: `${resolve(visualData['name'])} (${statData['grade']}★)`,
    description: `Lv. ${level}, +${bread} bread training, with` +
      `${!addStatMaxData ? 'out' : ''} berry training.`,
    thumbnail: { url: imagePath('heroes/' + visualData['face_tex']), },
    fields: embed.fields(names, values, inlines),
  });
}

exports.run = (message, args) => {
  const e = !args.length
    ? effectiveInstructions()
    : effectiveInfo(args, parseTrainingArgs(args));

  message.channel.send({ embed: e, });
}

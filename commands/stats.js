const d = require('../data.js');
const character_addstatmax = d.character_addstatmax();
const character_stat = d.character_stat();

const embed = require('../util/embed.js');
const filterCharacterVisual = require('../util/filterCharacterVisual.js');
const fuzzy = require('../util/fuzzy.js');
const getStat = require('../util/getStat.js');
const imagePath = require('../util/imagePath.js');
const resolve = require('../util/resolve.js');

statsInstructions = () => {
  const names = ['<name>', '<star>', '<level> <bread> <berry>',];
  const values = [
    `Get stats information.\n*e.g. !stats lee*`,
    'Filter heroes by <star>.\n*e.g. !stats lee 4*',
    'Modify training parameters. If not specified, defaults to max form.\n' +
      '*e.g. !stats lee 6 60 5 false*',
  ];
  const inlines = [true, true, true,];

  return embed.process({
    title: '!stats [<name>] [<star>] [<level> <bread> <berry>]',
    fields: embed.fields(names, values, inlines),
  });
}

statsInfo = (name, training) => {
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
    ? [0, 0, 0, 0, 0, 0, 0, 0,]
    : [
        addStatMaxData['hp'],
        addStatMaxData['attack_power'],
        addStatMaxData['critical_chance'],
        addStatMaxData['critical_damage'],
        addStatMaxData['armor'],
        addStatMaxData['resistance'],
        addStatMaxData['accuracy'],
        addStatMaxData['dodge'],
      ];
  const rounding = [1, 1, 2, 2, 1, 1, 2, 2,]; // match game's decimal places

  const names = [
    'HP',
    'Atk. Power',
    'Crit.Chance',
    'Crit.Damage',
    'Armor',
    'Resistance',
    'Accuracy',
    'Evasion',
  ];
  const values = [
    getStat(statData['initialhp'], statData['growthhp'], level, bread),
    getStat(statData['initialattdmg'], statData['growthattdmg'], level, bread),
    statData['critprob'],
    statData['critpower'],
    getStat(statData['defense'], statData['growthdefense'], level, bread),
    getStat(statData['resist'], statData['growthresist'], level, bread),
    statData['hitrate'],
    statData['dodgerate'],
  ].map((currentValue, index) => {
    return (currentValue + addBerry[index]).toFixed(rounding[index]);
  });
  const inlines = [true, true, true, true, true, true, true, true,];

  return embed.process({
    title: `${resolve(visualData['name'])} (${statData['grade']}★)`,
    description: `Lv. ${level}, +${bread} bread training, with` +
      `${!addStatMaxData ? 'out' : ''} berry training.`,
    thumbnail: { url: imagePath('heroes/' + visualData['face_tex']), },
    fields: embed.fields(names, values, inlines),
  });
}

// minimal check for valid parameters
parseTrainingArgs = (args) => {
  let berry = null;
  let bread = null;
  let level = null;
  let grade = null;

  if (args.length >= 5 && ['true', 'false'].includes(args[args.length - 1])) {
    berry = args.pop().toLowerCase() === 'true';
    bread = parseInt(args.pop());
    level = parseInt(args.pop());
    grade = args.pop();
  } else if (args.length >= 2
    && ['1', '2', '3', '4', '5', '6'].includes(args[args.length - 1])
  ) {
    grade = args.pop();
  }

  grade = ['1', '2', '3', '4', '5', '6'].includes(grade)
    ? parseInt(grade)
    : null;

  return [grade, level, bread, berry,];
}

exports.run = (message, args) => {
  const e = !args.length
    ? statsInstructions()
    : statsInfo(args, parseTrainingArgs(args));

  message.channel.send({ embed: e, });
}

const d = require('../data.js');
const character_addstatmax = d.character_addstatmax();
const character_stat = d.character_stat();
const character_visual = d.character_visual();

const filterCharacterVisual = require('../util/filterCharacterVisual.js');
const fuzzy = require('../util/fuzzy.js');
const getStat = require('../util/getStat.js');
const imagePath = require('../util/imagePath.js');
const resolve = require('../util/resolve.js');

statsInstructions = () => {
  return {
    title: '!stats [<name>] [<star>] [<level> <bread> <berry>]',
    fields: [
      {
        name: '<name>',
        value: `Get stats information.\n*e.g. !stats lee*`,
        inline: true
      },
      {
        name: '<star>',
        value: 'Filter heroes by <star>.\n*e.g. !stats lee 6*',
        inline: true
      },
      {
        name: '<level> <bread> <berry>',
        value: 'Modify training parameters. If missing, defaults to max.\n*e.g. !stats lee 6 60 5 true*',
        inline: true
      }
    ]
  };
}

statsInfo = (name, training) => {
  const data = training[0] === null ? filterCharacterVisual('max') : filterCharacterVisual(training[0]);

  const visualData = fuzzy(name, data, 'name');
  const statData = character_stat.filter(element => element['id'] === visualData['default_stat_id'])[0];

  const grade = statData['grade'];
  const berry = training[3];
  let addStatMaxData = grade === 6 && (berry === null || berry)
    ? character_addstatmax.filter(element => element['id'] === statData['addstat_max_id'])[0]
    : null;

  // resolve battleloid edge case
  if (!addStatMaxData) {
    addStatMaxData = null;
  }

  const level = training[1] === null || training[1] > grade * 10 || training[1] < 1
    ? grade * 10
    : training[1];
  const bread = training[2] === null || training[2] > grade - 1 || training[2] < 0
    ? grade - 1
    : training[2];

  // parallel arrays
  const addBerry = addStatMaxData === null
    ? [0, 0, 0, 0, 0, 0, 0, 0]
    : [
        addStatMaxData['hp'],
        addStatMaxData['attack_power'],
        addStatMaxData['critical_chance'],
        addStatMaxData['critical_damage'],
        addStatMaxData['armor'],
        addStatMaxData['resistance'],
        addStatMaxData['accuracy'],
        addStatMaxData['dodge']
      ];
  const rounding = [1, 1, 2, 2, 1, 1, 2, 2]; // match game's decimal places

  const names = [
    'HP',
    'Atk. Power',
    'Crit.Chance',
    'Crit.Damage',
    'Armor',
    'Resistance',
    'Accuracy',
    'Evasion'
  ];
  const values = [
    getStat(statData['initialhp'], statData['growthhp'], level, bread),
    getStat(statData['initialattdmg'], statData['growthattdmg'], level, bread),
    statData['critprob'],
    statData['critpower'],
    getStat(statData['defense'], statData['growthdefense'], level, bread),
    getStat(statData['resist'], statData['growthresist'], level, bread),
    statData['hitrate'],
    statData['dodgerate']
  ];
  const inlines = [true, true, true, true, true, true, true, true];

  return {
    thumbnail: { url: imagePath('heroes/' + visualData['face_tex']) },
    title: `${resolve(visualData['name'])} (${statData['grade']}★)`,
    description: `Lv. ${level}, +${bread} bread training, with${addStatMaxData === null ? 'out' : ''} berry training.`,
    fields: values.map((currentValue, index) => {
      return {
        name: names[index],
        value: (currentValue + addBerry[index]).toFixed(rounding[index]),
        inline: inlines[index]
      };
    })
  };
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
  } else if (args.length >= 2 && ['1', '2', '3', '4', '5', '6'].includes(args[args.length - 1])) {
    grade = args.pop();
  }

  grade = ['1', '2', '3', '4', '5', '6'].includes(grade) ? parseInt(grade) : null;

  return [grade, level, bread, berry];
}

exports.run = (message, args) => {
  const embed = args.length === 0 ? statsInstructions() : statsInfo(args, parseTrainingArgs(args));
  message.channel.send({ embed: embed });
  return true;
}

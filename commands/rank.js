const d = require('../data.js');
const character_addstatmax = d.character_addstatmax();
const character_stat = d.character_stat();

const filterCharacterVisual = require('../util/filterCharacterVisual.js');
const getStat = require('../util/getStat.js');
const resolve = require('../util/resolve.js');

rankInstructions = () => {
  return {
    title: '!rank [<stat>] [<class>]',
    fields: [
      {
        name: '<stat>',
        value: 'List the top 10 heroes by <stat>.\nChoose from: hp, ha, cc, cd, arm, res, acc, or eva.\n*e.g. !rank hp*'
      },
      {
        name: '<class>',
        value: 'Filter heroes by <class>.\n*e.g. !rank hp paladin*'
      }
    ]
  };
}

rankInfo = (args) => {
  const keys = [
    {
      base: 'initialhp',
      berry: 'hp',
      growth: 'growthhp',
      match: ['hp', 'health'],
      name: 'HP',
      rounding: 1
    },
    {
      base: 'initialattdmg',
      berry: 'attack_power',
      growth: 'growthattdmg',
      match: ['ha', 'attack'],
      name: 'Atk. Power',
      rounding: 1
    },
    {
      base: 'critprob',
      berry: 'critical_chance',
      growth: null,
      match: ['cc', 'chance'],
      name: 'Crit.Chance',
      rounding: 2

    },
    {
      base: 'critpower',
      berry: 'critical_damage',
      growth: null,
      match: ['cd', 'damage'],
      name: 'Crit.Damage',
      rounding: 2
    },
    {
      base: 'defense',
      berry: 'armor',
      growth: 'growthdefense',
      match: ['arm', 'armor'],
      name: 'Armor',
      rounding: 1
    },
    {
      base: 'resist',
      berry: 'resistance',
      growth: 'growthresist',
      match: ['res', 'resistance'],
      name: 'Resistance',
      rounding: 1
    },
    {
      base: 'hitrate',
      berry: 'accuracy',
      growth: null,
      match: ['acc', 'accuracy'],
      name: 'Accuracy',
      rounding: 2
    },
    {
      base: 'dodgerate',
      berry: 'dodge',
      growth: null,
      match: ['eva', 'evasion'],
      name: 'Evasion',
      rounding: 2
    },
  ];

  // resolve user input
  const key = keys.filter(element => {
    return element['match'].includes(args[0].toLowerCase());
  })[0];

  if (!key) {
    return { title: 'Error', description: 'Invalid <stat> parameter. Choose from: hp, ha, cc, cd, arm, res, acc, or eva.' };
  }

  // reduce calculation space by only considering heroes in their maxed form
  const data = filterCharacterVisual('max');

  let ranking = data.map(currentValue => {
    // filter out corresponding hero stat and berry stat
    const statsData = character_stat
      .filter(i => currentValue['default_stat_id'] === i['id'])[0];
    const berryData = character_addstatmax
      .filter(i => statsData['addstat_max_id'] === i['id'])[0];

    // calculate stats
    const berryStat = !berryData
      ? 0
      : berryData[key['berry']];
    const maxStat = !key['growth']
      ? statsData[key['base']]
      : getStat(statsData[key['base']], statsData[key['growth']], statsData['grade'] * 10, statsData['grade'] - 1);

    return {
      class: currentValue['classid'],
      name: currentValue['name'],
      stat: maxStat + berryStat
    };
  });

  // filter by class
  let heroClass;
  if (args.length > 1 && ['warrior', 'paladin', 'archer', 'hunter', 'wizard', 'priest'].includes(args[1].toLowerCase())) {
    heroClass = args[1].charAt(0).toUpperCase() + args[1].substr(1).toLowerCase() + 's';
    args[1] = args[1].toLowerCase();
    ranking = ranking.filter(element => element['class'].toLowerCase().includes(args[1]));
  } else {
    heroClass = null;
  }

  // sort by descending stat
  ranking = ranking.sort((a, b) => b.stat - a.stat);

  // get the top 10
  ranking = ranking.slice(0, 10);

  return {
    title: `${!heroClass ? 'All heroes' : heroClass} ranked by ${key['name']}`,
    description: ranking.map((currentValue, index) => `${index + 1}. ${resolve(currentValue['name'])}, ${currentValue['stat'].toFixed(key['rounding'])}`).join('\n'),
  };
}

exports.run = (message, args) => {
  const embed = args.length === 0 ? rankInstructions() : rankInfo(args);
  message.channel.send({ embed: embed });
  return true;
}

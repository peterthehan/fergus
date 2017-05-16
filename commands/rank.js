const d = require('../data.js');
const character_addstatmax = d.character_addstatmax();
const character_stat = d.character_stat();

const embed = require('../util/embed.js');
const filterCharacterVisual = require('../util/filterCharacterVisual.js');
const getStat = require('../util/getStat.js');
const resolve = require('../util/resolve.js');

rankInstructions = () => {
  const names = ['<stat>', '<class>', '<isDescending>',];
  const values = [
    'List the top 10 heroes by <stat>.\nChoose from: ' +
        'hp, ha, cc, cd, arm, res, acc, eva, ' +
        'bhp, bha, bcc, bcd, barm, bres, bacc, beva.\n' +
        '*e.g. !rank hp, !rank bhp*',
    'Filter heroes by <class>.\n' +
        '*e.g. !rank hp paladin, !rank hp paladin false*',
    'Determine sort order. If not specified, defaults to true.\n' +
        '*e.g. !rank hp false*',
  ];
  const inlines = [false, false, false,];

  return embed.process({
    title: '!rank [<stat>] [<class>|<isDescending>] [<isDescending>]',
    fields: embed.fields(names, values, inlines),
  });
}

rankInfo = (args) => {
  // resolve first parameter of user input
  args[0] = args[0].toLowerCase(); // case-insensitive
  const berryFlag = args[0].startsWith('b');
  if (berryFlag) {
    args[0] = args[0].replace(/b/, '');
  }

  const key = rankKeys()
      .filter(element => element['match'].includes(args[0]))[0];
  if (!key) {
    return embed.process({
      title: 'Error',
      description: 'Invalid <stat> parameter. Choose from: ' +
          'hp, ha, cc, cd, arm, res, acc, eva, ' +
          'bhp, bha, bcc, bcd, barm, bres, bacc, beva.',
    });
  }

  // reduce calculation space by only considering heroes in their maxed form
  const data = filterCharacterVisual('max');

  let ranking = data.map(currentValue => {
    // filter out corresponding hero stat and berry stat
    const statsData = character_stat.filter(i => {
      return currentValue['default_stat_id'] === i['id'];
    })[0];
    const berryData = character_addstatmax.filter(i => {
      return statsData['addstat_max_id'] === i['id']
    })[0];

    // calculate stats
    let statValue;
    if (berryFlag) {
      statValue = 0;
    } else {
      statValue = !key['growth']
          ? statsData[key['base']]
          : getStat(
              statsData[key['base']],
              statsData[key['growth']],
              statsData['grade'] * 10,
              statsData['grade'] - 1
            );
    }
    const berryValue = !berryData ? 0 : berryData[key['berry']];

    return {
      class: currentValue['classid'],
      grade: statsData['grade'],
      name: currentValue['name'],
      stat: statValue + berryValue,
    };
  });

  // defaults to consider all heroes and sort by descending stat order
  let heroClass = null;
  let isDescending = true;

  if (args.length >= 2) {
    args[1] = args[1].toLowerCase();
    if (['warrior', 'paladin', 'archer', 'hunter', 'wizard', 'priest'].includes(args[1])) {
      heroClass = args[1].charAt(0).toUpperCase() +
          args[1].substr(1).toLowerCase() + 's';
      ranking = ranking.filter(element => element['class'].toLowerCase().includes(args[1]));
    }
    if ('false' === args[1] || (args.length > 2 && 'false' === args[2].toLowerCase())) {
      isDescending = false;
      // filter out non-6 star heroes and edge case with battleloid s-6
      ranking = ranking.filter(element => {
        return element['grade'] === 6
            && element['name'] !== 'TEXT_CHA_WA_SUPPORT_6_1_NAME';
      });
    }
  }

  // sort
  ranking = isDescending
    ? ranking.sort((a, b) => b.stat - a.stat)
    : ranking.sort((a, b) => a.stat - b.stat);

  // get the first 10 results
  ranking = ranking.slice(0, 10);

  return embed.process({
    title:
      (!heroClass ? 'All heroes' : heroClass) + ' ranked in ' +
        (isDescending ? 'descending' : 'ascending') + ' order by ' +
        (berryFlag ? 'berry ' : ' ') + key['name'],
    description:
      ranking.map((currentValue, index) => {
        return `${index + 1}. ${resolve(currentValue['name'])},` +
            `${currentValue['stat'].toFixed(key['rounding'])}`
      }).join('\n'),
  });
}

rankKeys = () => {
  return [
    {
      base: 'initialhp',
      berry: 'hp',
      growth: 'growthhp',
      match: ['hp', 'health'],
      name: 'HP',
      rounding: 1,
    },
    {
      base: 'initialattdmg',
      berry: 'attack_power',
      growth: 'growthattdmg',
      match: ['ha', 'attack'],
      name: 'Atk. Power',
      rounding: 1,
    },
    {
      base: 'critprob',
      berry: 'critical_chance',
      growth: null,
      match: ['cc', 'chance'],
      name: 'Crit.Chance',
      rounding: 2,

    },
    {
      base: 'critpower',
      berry: 'critical_damage',
      growth: null,
      match: ['cd', 'damage'],
      name: 'Crit.Damage',
      rounding: 2,
    },
    {
      base: 'defense',
      berry: 'armor',
      growth: 'growthdefense',
      match: ['arm', 'armor'],
      name: 'Armor',
      rounding: 1,
    },
    {
      base: 'resist',
      berry: 'resistance',
      growth: 'growthresist',
      match: ['res', 'resistance'],
      name: 'Resistance',
      rounding: 1,
    },
    {
      base: 'hitrate',
      berry: 'accuracy',
      growth: null,
      match: ['acc', 'accuracy'],
      name: 'Accuracy',
      rounding: 2,
    },
    {
      base: 'dodgerate',
      berry: 'dodge',
      growth: null,
      match: ['eva', 'evasion'],
      name: 'Evasion',
      rounding: 2,
    },
  ];
}

exports.run = (message, args) => {
  const e = args.length === 0 ? rankInstructions() : rankInfo(args);

  message.channel.send({ embed: e, });
  return true;
}

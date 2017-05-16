const d = require('../data.js');
// remove event, legendary, and supply heroes from the pool
const character_visual = d.character_visual()
  .filter(element => {
    return element['rarity'] !== 'LIMITED'
        && element['rarity'] !== 'DESTINY'
        && element['rarity'] !== 'SUPPORT';
  });

const bounds = require('../util/bounds.js');
const embed = require('../util/embed.js');
const extractGrade = require('../util/extractGrade.js');
const filterCharacterVisual = require('../util/filterCharacterVisual.js');
const random = require('../util/random.js');
const resolve = require('../util/resolve.js');

pullInstructions = () => {
  const names = ['<number>', '\u200b',];
  const values = [
    'Simulate pulling <number> heroes via premium contract.\n*e.g. !pull 10*',
    'As per https://goo.gl/k62wvU, the rates are:\n' +
        '6★: 0.60%, 5★: 3.50%, 4★: 14.90%, 3★: 81.00%.',
  ];
  const inlines = [true, false,];

  return embed.process({
    title: '!pull [<number>]',
    fields: embed.fields(names, values, inlines),
  });
}

pickGrade = () => {
  const roll = Math.random();
  if (roll >= 0 && roll <= 0.81) {
    return '3';
  } else if (roll > 0.81 && roll <= 0.81 + 0.149) {
    return '4';
  } else if (roll > 0.81 + 0.149 && roll <= 0.81 + 0.149 + 0.035) {
    return '5';
  }
  return '6';
}

pickHero = (forcedGrade = null) => {
  const grade = forcedGrade === null
      ? pickGrade()
      : forcedGrade;
  const data = filterCharacterVisual(
    grade,
    forcedGrade === null
        ? character_visual
        : character_visual.filter(element => element['isgachagolden'])
  );

  return data[random(0, data.length - 1)];
}

pull = (message, n) => {
  const results = [];
  for (let i = 1; i <= n; ++i) {
    const hero = pickHero(!(i % 10) ? 4 : null);
    const grade = extractGrade(hero['id']);
    const result = `${i}. ${resolve(hero['name'])} (${grade}★)`;
    // bold results with grades greater than 3
    results.push(
      `${grade > 3 ? '**' : ''}${result}` +
          `${!(i % 10) ? ' (Guaranteed)' : ''}${grade > 3 ? '**' : ''}`
    );
  }

  return embed.process({
    title: 'Results',
    description:
        `${message.author} (${message.author.tag})\n\n` +
        `${results.join('\n')}`,
  });
}


exports.run = (message, args) => {
  let e;
  if (args.length === 0) {
    e = pullInstructions();
  } else {
    const number = [1, 10];
    number.push(!isNaN(args[0]) ? parseInt(args[0]) : 10);
    e = pull(message, bounds(number));
  }

  message.channel.send({ embed: e, });
  return true;
}

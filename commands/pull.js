const d = require('../data.js');
// remove legendary and event heroes from the pool
const character_visual = d.character_visual().filter(element => element['rarity'] !== 'LIMITED' && element['rarity'] !== 'DESTINY');

const bounds = require('../util/bounds.js');
const extractGrade = require('../util/extractGrade.js');
const filterCharacterVisual = require('../util/filterCharacterVisual.js');
const random = require('../util/random.js');
const resolve = require('../util/resolve.js');

pullInfo = () => {
  return {
    title: '!pull [<number>]',
    fields: [
      {
        name: '<number>',
        value: 'Simulate pulling <number> heroes via premium contract.\n*e.g. !pull 10*',
        inline: true
      },
      {
        name: '\u200b',
        value: 'As per https://goo.gl/k62wvU, the rates are:\n6★: 0.60%, 5★: 3.50%, 4★: 14.90%, 3★: 81.00%.',
        inline: false
      }
    ]
  };
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
  const grade = forcedGrade === null ? pickGrade() : forcedGrade;
  const data = filterCharacterVisual(grade, character_visual);
  const pulled = data[random(0, data.length - 1)];
  return pulled;
}

pull = (n = 1) => {
  const description = [];
  for (let i = 1; i <= n; ++i) {
    let hero = pickHero(!(i % 10) ? 4 : null);
    description.push(`${i}. ${resolve(hero['name'])} (${extractGrade(hero['id'])}★)${!(i % 10) ? ' (Guaranteed)' : ''}`);
  }
  return {
    title: 'You pulled...',
    description: description.join('\n')
  };
}


exports.run = (message, args) => {
  let embed = {};

  if (args.length === 0) {
    embed = pullInfo();
  } else {
    const number = [1, 10];
    number.push(!isNaN(args[0]) ? parseInt(args[0]) : 10);
    embed = pull(bounds(number));
  }

  message.channel.send({ embed: embed });
  return true;
}

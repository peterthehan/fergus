const d = require('../data.js');
const character_visual = d.character_visual();
const costume = d.costume();
const hero_easteregg = d.hero_easteregg();

const humanizeDuration = require('humanize-duration');
const author = require('../util/author.js');
const embed = require('../util/embed.js');
const imagePath = require('../util/imagePath.js');
const random = require('../util/random.js');
const resolve = require('../util/resolve.js');

const userInteractions = {};
const maxUsage = 10;

interactInstructions = (message) => {
  const max = 86400000; // 24h = 86400000 ms

  const names = ['<number>', '\u200b',];
  const values = [
    'View hero interactions.\n*e.g. !interact 46, !interact 59*',
    `Note: <number>: [1, ${hero_easteregg.length}] ` +
      '(defaults to random for anything outside this range). ' +
      `This command can only be used ${maxUsage} times per user per *session*` +
      ` (bot session will cycle in ` +
      `${humanizeDuration(max - message.client.uptime, { round: true, })} ` +
      `+ [up to 216 random minutes](https://devcenter.heroku.com/articles/dynos#restarting)).`,
  ];
  const inlines = [true, false,];

  return embed.process({
    title: '!interact [<number>]',
    fields: embed.fields(names, values, inlines),
  });
}

interact = (index) => {
  const regExp = new RegExp(`_${index}$`);
  const filtered = hero_easteregg[hero_easteregg.findIndex(i => regExp.test(i.id))].eatereggherotext;

  const dialogue = [];
  for (i of Object.keys(filtered)) {
    let e;

    // handle edge case involving bad key names in interactions data file
    const dict = {
      'COS_PR_6_2': 'TEXT_CHA_PR_2_6', // summer vacation maria
      'COS_EVENT_AR_14_OLYMPIC': 'TEXT_COS_AR_14_OLYMPIC', // mamba of the national team
      'COS_WI_5_10': 'TEXT_COS_EVENT_WI_5_WINTER', // ice queen lilith
      'COS_AR_4_17_ROCK': 'TEXT_COS_AR_4_17_NAME', // devastating drum robin hood
      'COS_EVENT_WI_11_OLYMPIC': 'TEXT_COS_WI_11_OLYMPIC', // samba cano
      'COS_EVENT_WI_5_OLYMPIC': 'TEXT_COS_WI_5_OLYMPIC', // carnival lilith
      'COS_EVENT_WA_5_LABORDAY': 'TEXT_COS_EVENT_WA_5_LAVORDAY_NAME', // monte98
      'COS_WA_2_2_RE': 'TEXT_COS_WA_2_2', // joan, knight of roses (redesign)
    };

    const flag = i.startsWith('CHA');
    const hero = flag
      ? character_visual[character_visual.findIndex(j => j.id === i)]
      : costume[costume.findIndex(j => {
          const currentSkin = i in dict
            ? dict[i]
            : `TEXT_${i}${j.costume_name.endsWith('_NAME') ? '_NAME' : ''}`;
          return j.costume_name === currentSkin;
        })];

    if (hero == null) {
      continue;
    }

    e = embed.process({
      title: resolve(flag ? hero.name : hero.costume_name),
      description: resolve(filtered[i]),
      thumbnail: { url: imagePath(`${flag ? 'heroes' : 'skins'}/${hero.face_tex}${i === 'COS_WA_2_2_RE' ? '_re' : ''}`), },
    });

    dialogue.push(e);
  }

  return dialogue;
}

exports.run = (message, args) => {
  let e;
  if (!args.length) {
    e = interactInstructions(message);
  } else {
    if (!userInteractions[message.author.id]) {
      userInteractions[message.author.id] = 0;
    }

    if (message.author.id === author.id() || userInteractions[message.author.id] < maxUsage) {
      ++userInteractions[message.author.id];

      const index = !isNaN(args[0])
        && parseInt(args[0]) >= 1
        && parseInt(args[0]) <= hero_easteregg.length
          ? parseInt(args[0])
          : random(0, hero_easteregg.length);

      e = interact(index);
    } else {
      e = embed.process({
        title: 'Error',
        description:
          `You have used up your ${maxUsage} interact command allowances! ` +
          'Wait for the session to cycle to use this command again.',
      });
    }
  }

  e.constructor === Array
    ? e.forEach(currentValue => message.channel.send({ embed: currentValue, }))
    : message.channel.send({ embed: e, });
}

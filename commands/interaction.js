const d = require('../data.js');
const character_visual = d.character_visual();
const hero_easteregg = d.hero_easteregg();

const embed = require('../util/embed.js');
const imagePath = require('../util/imagePath.js');
const random = require('../util/random.js');
const resolve = require('../util/resolve.js');

const userInteractions = {};

interactionInstructions = () => {
  const names = ['<number>', '\u200b',];
  const values = [
    'View hero interactions.\n*e.g. !interaction 1*',
    `Limitations: <number>: [1, ${hero_easteregg.length}] ` +
      '(defaults to random for anything outside this range), ' +
      'once per user per session ' +
      '(~24 hours, clock can be viewed using the status command).',
  ];
  const inlines = [true, false,];

  return embed.process({
    title: '!interaction [<number>]',
    fields: embed.fields(names, values, inlines),
  });
}

interaction = (index) => {
  const regExp = new RegExp(`_${index}$`);
  const filtered = hero_easteregg
    .filter(element => regExp.test(element['id']))[0]['eatereggherotext'];

  const dialogue = [];
  for (i of Object.keys(filtered)) {
    const hero = character_visual
      .filter(element => element['id'] === i)[0];

    dialogue.push(
      embed.process({
        title: resolve(hero['name']),
        description: resolve(filtered[i]),
        thumbnail: { url: imagePath('heroes/' + hero['face_tex']), },
      })
    );
  }

  return dialogue;
}

exports.run = (message, args) => {
  let e;
  if (!args.length) {
    e = interactionInstructions();
  } else if (!userInteractions[message.author.id]) {
    userInteractions[message.author.id] = 1;

    const index = !isNaN(args[0])
      && parseInt(args[0]) >= 1
      && parseInt(args[0]) <= hero_easteregg.length
        ? parseInt(args[0])
        : random(0, hero_easteregg.length);

    e = interaction(index);
  } else {
    e = embed.process({
      title: 'Error',
      description:
        'Wait for the session to cycle to use this command again!',
    });
  }

  if (e.constructor === Array) {
    for (i of e) {
      message.channel.send({ embed: i, });
    }
  } else {
    message.channel.send({ embed: e, });
  }
  return true;
}

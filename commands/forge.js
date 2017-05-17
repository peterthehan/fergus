const d = require('../data.js');
// remove event and non-4 star sbws from the pool
const sbw = d.sbw()
  .filter(element => {
    return element['grade'] === 4 && element['rarity'] === 'LEGENDARY';
  });

const bounds = require('../util/bounds.js');
const embed = require('../util/embed.js');
const random = require('../util/random.js');
const resolve = require('../util/resolve.js');

forgeInstructions = () => {
  const names = ['<weapon>', '<number>',];
  const values = [
    'Simulate forging a <weapon>.\n*e.g. !forge bow*',
    'Forge <number> weapons.\n*e.g. !forge bow 10*',
  ];
  const inlines = [false, false,];

  return embed.process({
    title: '!forge [<weapon>] [<number>]',
    fields: embed.fields(names, values, inlines),
  });
}

pickWeapon = (weapon) => {
  const data = sbw
    .filter(element => element['categoryid'].toLowerCase().includes(weapon));
  return data[random(0, data.length - 1)];
}

pickConversion = () => {
  const options = ['A', 'D', 'F'];
  return options[random(0, options.length - 1)] +
    options[random(0, options.length - 1)];
}

forge = (message, args) => {
  if (!['sword', 'hammer', 'bow', 'gun', 'staff', 'orb']
    .includes(args[0].toLowerCase())
  ) {
    return embed.process({
      title: 'Error',
      description: 'Invalid <weapon> parameter. Choose from: ' +
        'sword, hammer, bow, gun, staff, orb.',
    });
  }

  const number = [1, 10];
  number.push(args.length >= 2 && !isNaN(args[1]) ? parseInt(args[1]) : 1);
  const n = bounds(number);

  const results = [];
  for (let i = 1; i <= n; ++i) {
    const data = pickWeapon(args[0].toLowerCase());
    const weapon = resolve(data['name']);
    const conversion = pickConversion();
    const hero = resolve('TEXT_' + data['reqhero_ref'] + '_NAME');
    const result = `${i}. ${weapon} (${conversion}), ${hero}`;

    results.push(result);
  }

  return embed.process({
    title: 'Results',
    description:
      `${message.author} (${message.author.tag})\n\n` +
      `${results.join('\n')}`,
  });
}

exports.run = (message, args) => {
  const e = !args.length ? forgeInstructions() : forge(message, args);

  message.channel.send({ embed: e, });
  return true;
}

const d = require('../data.js');
const costume = d.costume();

const fuzzy = require('../util/fuzzy.js');
const imagePath = require('../util/imagePath.js');
const list = require('../util/list.js');
const resolve = require('../util/resolve.js');

skinInstructions = () => {
  return {
    title: '!skin [<name>]',
    fields: [
      {
        name: '<name>',
        value: `Get skin information.\n*e.g. !skin lee*`,
        inline: true
      }
    ]
  };
}

skinInfo = (name) => {
  const data = fuzzy(name, costume, 'costume_name');

  // modify 'Type' value for display
  const convert = {
    'AttackPower': 'Atk. Power',
    'CriticalDamage': 'Crit.Damage',
    'CriticalChance': 'Crit.Chance',
    'Dodge': 'Evasion',
    'All': 'Stats'
  };

  // parallel arrays
  const names = ['Sell'];
  const values = [data['sell_price']];
  const inlines = [true];

  const description = data['addstat_json'].map(currentValue => {
    const label = currentValue['Type'] in convert
      ? convert[currentValue['Type']]
      : currentValue['Type'];
    const value = currentValue['Value'] < 1
      ? `${parseInt(currentValue['Value'] * 100)}%`
      : currentValue['Value'];

    return label + ': ' + value;
  });

  return {
    thumbnail: { url: imagePath('skins/' + data['face_tex']) },
    title: resolve(data['costume_name']),
    description: description.join('\n'),
    fields: values.map((currentValue, index) => {
      return { name: names[index], value: currentValue, inline: inlines[index] };
    })
  };
}

exports.run = (message, args) => {
  let embed = {};

  if (args.length === 0) {
    embed = skinInstructions();
  } else {
    embed = args[0].startsWith('list') ? skinList() : skinInfo(args);
  }

  message.channel.send({ embed: embed });
  return true;
}

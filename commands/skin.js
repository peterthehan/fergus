const d = require('../data.js');
const costume = d.costume();

const embed = require('../util/embed.js');
const fuzzy = require('../util/fuzzy.js');
const imagePath = require('../util/imagePath.js');
const list = require('../util/list.js');
const resolve = require('../util/resolve.js');

skinInstructions = () => {
  const names = ['<name>',];
  const values = [`Get skin information.\n*e.g. !skin lee*`,];
  const inlines = [true,];

  return embed.process({
    title: '!skin [<name>]',
    thumbnail: { url: imagePath('etc/costume_selection'), },
    fields: embed.fields(names, values, inlines),
  });
}

skinInfo = (name) => {
  const data = fuzzy(name, costume, 'costume_name');

  // modify 'Type' value for display
  const convert = {
    'AttackPower': 'Atk. Power',
    'CriticalDamage': 'Crit.Damage',
    'CriticalChance': 'Crit.Chance',
    'Dodge': 'Evasion',
    'All': 'Stats',
  };

  const description = data['addstat_json'].map(currentValue => {
    const label = currentValue['Type'] in convert
      ? convert[currentValue['Type']]
      : currentValue['Type'];
    const value = currentValue['Value'] < 1
      ? `${parseInt(currentValue['Value'] * 100)}%`
      : currentValue['Value'];

    return label + ': ' + value;
  });

  const names = ['Sell',];
  const values = [data['sell_price'],];
  const inlines = [true,];

  const e = [
    embed.process({
      title: resolve(data['costume_name']),
      description: description.join('\n'),
      thumbnail: { url: imagePath('skins/' + data['face_tex']), },
      fields: embed.fields(names, values, inlines),
    }),
  ];

  // edge case with joan skin
  if (data['face_tex'] === 'cos_wa_2_2') {
    e.push(
      embed.process({
        title: resolve(data['costume_name']),
        description: description.join('\n'),
        thumbnail: { url: imagePath('skins/' + data['face_tex'] + '_re'), },
        fields: embed.fields(names, values, inlines),
      })
    );
  }

  return e;
}

exports.run = (message, args) => {
  //console.log(costume.map(i => resolve(i.costume_name) + ' ' + i.face_tex).join(', '));
  const e = !args.length ? [skinInstructions()] : skinInfo(args);

  e.forEach(currentValue => message.channel.send({ embed: currentValue, }));
}

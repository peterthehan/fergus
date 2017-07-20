const d = require('../data.js');
const character_stat = d.character_stat();
//const character_visual = d.character_visual();

const embed = require('../util/embed.js');
const extractGradeArg = require('../util/extractGradeArg.js');
const filterCharacterVisual = require('../util/filterCharacterVisual.js');
const fuzzy = require('../util/fuzzy.js');
const imagePath = require('../util/imagePath.js');
const resolve = require('../util/resolve.js');

heroInstructions = () => {
  const names = ['<name>', '<star>',];
  const values = [
    'Get hero information.\n*e.g. !hero lee*',
    'Filter heroes by <star>.\n*e.g. !hero lee 4*',
  ];
  const inlines = [true, true,];

  return embed.process({
    title: '!hero [<name>] [<star>]',
    fields: embed.fields(names, values, inlines),
  });
}

heroInfo = (name, grade = null) => {
  const data = filterCharacterVisual(!grade ? 'max' : grade);

  const visualData = fuzzy(name, data, 'name');
  const statData = character_stat
    .filter(element => element['id'] === visualData['default_stat_id'])[0];

  // remove unreleased domains
  let domain;
  if (['CHEN', 'GODDESS', 'MINO', 'NOS',]
    .includes(visualData['domain'])
  ) {
    domain = 'Unknown';
  } else {
    domain = resolve(
      visualData['domain'] === 'NONEGROUP'
        ? 'TEXT_CHAMP_DOMAIN_' + visualData['domain'] + '_NAME'
        : 'TEXT_CHAMPION_DOMAIN_' + visualData['domain']
    );
  }

  const rarity = visualData['rarity'] === 'LEGENDARY'
    ? visualData['isgachagolden'] ? 'IN_GACHA' : 'LAGENDARY'
    : visualData['rarity'];

  const names = ['Class', 'Rarity', 'Faction', 'Gender', 'How to get',];
  const values = [ // key does not resolve as-is, modification necessary
    resolve('TEXT_CLASS_' + visualData['classid'].substring(4)),
    resolve('TEXT_CONFIRM_SELL_' + rarity + '_HERO'),
    domain,
    resolve('TEXT_EXPLORE_TOOLTIP_GENDER_' + visualData['gender']),
    !visualData['howtoget'] ? null : visualData['howtoget'].join(', '),
  ];
  const inlines = [true, true, true, true, false,];

//console.log(visualData['face_tex']);

  return embed.process({
    title: `${resolve(visualData['name'])} (${statData['grade']}★)`,
    description: resolve(visualData['desc']),
    thumbnail: { url: imagePath('heroes/' + visualData['face_tex']), },
    fields: embed.fields(
      names,
      values.map(currentValue => !currentValue ? '-' : currentValue),
      inlines
    ),
  });
}

exports.run = (message, args) => {
  //console.log(character_visual.map(i => resolve(i.name) + ' ' + i.face_tex).join(', '));
  const e = !args.length
    ? heroInstructions()
    : heroInfo(args, extractGradeArg(args));

  message.channel.send({ embed: e, });
}

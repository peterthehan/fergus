const d = require('../data.js');
const character_stat = d.character_stat();
const character_visual = d.character_visual();

const embed = require('../util/embed.js');
const extractGradeArg = require('../util/extractGradeArg.js');
const filterCharacterVisual = require('../util/filterCharacterVisual.js');
const fuzzy = require('../util/fuzzy.js');
const imagePath = require('../util/imagePath.js');
const resolve = require('../util/resolve.js');

blockInstructions = () => {
  const names = ['<name>', '<star>',];
  const values = [
    `Get block information.\n*e.g. !block lee*`,
    'Filter heroes by <star>.\n*e.g. !block lee 4*',
  ];
  const inlines = [true, true,];

  return embed.process({
    title: '!block [<name>] [<star>]',
    fields: embed.fields(names, values, inlines),
  });
}

blockInfo = (name, grade = null) => {
  const data = !grade
    ? filterCharacterVisual('max')
    : filterCharacterVisual(grade);

  const visualData = fuzzy(name, data, 'name');
  const statData = character_stat
    .filter(element => element['id'] === visualData['default_stat_id'])[0];

  const names = [
    resolve(statData['skill_name']) +
      ` (Lv. ${[1, 1, 1, 2, 2, 3][statData['grade'] - 1]})`,
  ];
  const values = [resolve(statData['skill_desc']),];
  const inlines = [false,];

  // add passive to parallel arrays if they exist
  const skill_subname = resolve(statData['skill_subname']);
  const skill_subdesc = resolve(statData['skill_subdesc']);
  if (skill_subname && skill_subdesc) {
    // key does not resolve as-is, modification necessary
    names.push(
      skill_subname + ' (' +
        resolve('TEXT_PASSIVE_SKILL_TOOLTIP_TYPE_' + statData['hero_type']) +
        ')'
    );
    values.push(skill_subdesc);
    inlines.push(false);
  }

  return embed.process({
    title: `${resolve(visualData['name'])} (${statData['grade']}★)`,
    thumbnail: { url: imagePath('blocks/' + statData['skill_icon']), },
    fields: embed.fields(names, values, inlines),
  });
}

exports.run = (message, args) => {
  const e = !args.length
    ? blockInstructions()
    : blockInfo(args, extractGradeArg(args));

  message.channel.send({ embed: e, });
  return true;
}

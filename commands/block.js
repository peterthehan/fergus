const d = require('../data.js');
const character_stat = d.character_stat();
const character_visual = d.character_visual();

const extractGradeArg = require('../util/extractGradeArg.js');
const filterCharacterVisual = require('../util/filterCharacterVisual.js');
const fuzzy = require('../util/fuzzy.js');
const imagePath = require('../util/imagePath.js');
const resolve = require('../util/resolve.js');

blockInstructions = () => {
  return {
    title: '!block [<name>] [<star>]',
    fields: [
      {
        name: '<name>',
        value: `Get block information.\n*e.g. !block lee*`,
        inline: true
      },
      {
        name: '<star>',
        value: 'Filter heroes by <star>.\n*e.g. !block lee 6*',
        inline: true
      }
    ]
  };
}

blockInfo = (name, grade = null) => {
  const data = grade === null ? character_visual : filterCharacterVisual(grade);

  const visualData = fuzzy(name, data, 'name');
  const statData = character_stat.filter(element => element['id'] === visualData['default_stat_id'])[0];

  // parallel arrays
  const names = [`${resolve(statData['skill_name'])} (Lv. ${[1, 1, 1, 2, 2, 3][statData['grade'] - 1]})`];
  const values = [resolve(statData['skill_desc'])];
  const inlines = [false];

  // add passive to parallel arrays if they exist
  const skill_subname = resolve(statData['skill_subname']);
  const skill_subdesc = resolve(statData['skill_subdesc']);
  if (skill_subname !== null && skill_subdesc !== null) {
    // key does not resolve as-is, modification necessary
    const hero_type = resolve('TEXT_PASSIVE_SKILL_TOOLTIP_TYPE_' + statData['hero_type']);

    names.push(`${skill_subname} (${hero_type})`);
    values.push(skill_subdesc);
    inlines.push(false);
  }

  return {
    thumbnail: { url: imagePath('blocks/' + statData['skill_icon']) },
    title: `${resolve(visualData['name'])} (${statData['grade']}★)`,
    fields: values.map((currentValue, index) => {
      return { name: names[index], value: currentValue, inline: inlines[index] };
    })
  };
}

exports.run = (message, args) => {
  const embed = args.length === 0 ? blockInstructions() : blockInfo(args, extractGradeArg(args));
  message.channel.send({ embed: embed });
  return true;
}

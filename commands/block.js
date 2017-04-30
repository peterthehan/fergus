const character_stat = require('../Decrypted/get_character_stat.json')['character_stat'].filter(element => element['hero_type'] !== null); // 666
const character_visual = require('../Decrypted/get_character_visual.json')['character_visual'].filter(element => element['type'] === 'HERO'); // 662

const de = require('../util/deepCopy.js');
const fu = require('../util/fuzzy.js');
const re = require('../util/resolve.js');

blockInstructions = () => {
  return {
    title: '!block [<name>] [<star>]',
    fields: [
      {
        name: '<name>',
        value: 'Get block skill and passive information.\n*e.g. !block lee*',
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
  const data = grade === null ? character_visual : filterCharacter(grade);
  const visualData = de.deepCopy(fu.fuzzy(name, data, 'name'));
  const statData = character_stat.filter(element => element['id'] === visualData['default_stat_id'])[0];

  // parallel arrays
  let names = [re.resolve(statData['skill_name'])];
  let values = [re.resolve(statData['skill_desc'])];
  let inlines = [false];

  const skill_subname = re.resolve(statData['skill_subname']);
  const skill_subdesc = re.resolve(statData['skill_subdesc']);
  if (skill_subname !== null && skill_subdesc !== null) {
    names.push(skill_subname);
    values.push(skill_subdesc);
    inlines.push(false);
  }

  return {
    thumbnail: {
      url: ''
    },
    title: `${re.resolve(visualData['name'])} (${statData['grade']}★)`,
    fields: values.map((currentValue, index) => {
      return {
        name: names[index] === null ? '-' : names[index],
        value: currentValue === null ? '-' : currentValue,
        inline: inlines[index]
      };
    })
  };
}

getGrade = (args) => {
  if (args.length >= 2 && !isNaN(args[args.length - 1])) {
    const potentialGrade = parseInt(args[args.length - 1]);
    if (potentialGrade >= 1 && potentialGrade <= 6) {
      args.pop();
      return potentialGrade;
    }
  }
  return null;
}

filterCharacter = (grade) => {
  return character_visual.filter(element => parseInt(element['id'].match(/_\d/)[0].match(/\d/)[0]) === parseInt(grade));
}

exports.run = (message, args) => {
  const content = '';
  const embed = args.length === 0 ? blockInstructions() : blockInfo(args, getGrade(args));
  message.channel.sendMessage(content, { embed: embed });
}

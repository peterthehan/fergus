const character_stat = require('../Decrypted/get_character_stat.json')['character_stat'].filter(element => element['hero_type'] !== null); // 666
const character_visual = require('../Decrypted/get_character_visual.json')['character_visual'].filter(element => element['type'] === 'HERO'); // 662

const de = require('../util/deepCopy.js');
const fu = require('../util/fuzzy.js');
const im = require('../util/imagePath.js');
const re = require('../util/resolve.js');

heroInstructions = () => {
  return {
    title: '!hero [<name>] [<star>]',
    fields: [
      {
        name: '<name>',
        value: 'Get hero information.\n*e.g. !hero lee*',
        inline: true
      },
      {
        name: '<star>',
        value: 'Filter heroes by <star>.\n*e.g. !hero lee 6*',
        inline: true
      }
    ]
  };
}

heroInfo = (name, grade = null) => {
  const data = grade === null ? character_visual : filterCharacter(grade);
  const visualData = de.deepCopy(fu.fuzzy(name, data, 'name'));
  const statData = character_stat.filter(element => element['id'] === visualData['default_stat_id'])[0];

  // keys require modification since they don't resolve as-is
  modifyKeys(visualData);

  // parallel arrays
  const names = [
    'Class',
    'Domain',
    'Gender',
    //'Job',
    'Rarity',
    'How to get'
  ];
  const values = [
    re.resolve(visualData['classid']),
    re.resolve(visualData['domain']),
    re.resolve(visualData['gender']),
    //visualData['job'],
    re.resolve(visualData['rarity']),
    visualData['howtoget'] === null ? null : visualData['howtoget'].join(', ')
  ];
  const inlines = [
    true,
    true,
    true,
    //true,
    true,
    false
  ];

  return {
    thumbnail: {
      url: im.imagePath('heroes/' + visualData['face_tex'])
    },
    title: `${re.resolve(visualData['name'])} (${statData['grade']}★)`,
    description: re.resolve(visualData['desc']),
    fields: values.map((currentValue, index) => {
      return {
        name: names[index],
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

modifyKeys = (visualData) => {
  visualData['classid'] = 'TEXT_CLASS_' + visualData['classid'].substring(4);
  visualData['rarity'] = 'TEXT_CONFIRM_SELL_' + (visualData['rarity'] === 'LEGENDARY' ? 'LAGENDARY' : visualData['rarity']) + '_HERO';
  if (visualData['domain'] !== null ) {
    if (visualData['domain'] === 'NONEGROUP') {
      visualData['domain'] = 'TEXT_CHAMP_DOMAIN_' + visualData['domain'] + '_NAME';
    } else {
      visualData['domain'] = 'TEXT_CHAMPION_DOMAIN_' + visualData['domain'];
    }
  }
  visualData['gender'] = 'TEXT_EXPLORE_TOOLTIP_GENDER_' + visualData['gender'];
  // visualData['job'] doesn't require modification
  /*TODO visualData['howtoget'] = visualData['howtoget'].map(currentValue => {
    if(currentValue.startsWith('STAGE')) {
      return 'TEXT_' + currentValue + '_NAME';
    } else {
      return 'TEXT_HOW_TO_GET_' + currentValue;
    }
  });*/
}

exports.run = (message, args) => {
  const content = '';
  const embed = args.length === 0 ? heroInstructions() : heroInfo(args, getGrade(args));
  message.channel.sendMessage(content, { embed: embed });
}

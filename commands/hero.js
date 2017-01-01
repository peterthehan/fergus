function getHeroDataEmbedStarter(hero, star, arr) {
  const embed = require('../util/embed.js').run()
    .setThumbnail(getHeroImageURL(hero, star, arr))
    .setTitle(getHeroHeader(hero, star, arr));
  return embed;
}

function getHeroImageURL(hero, star, arr) {
  return 'https://raw.githubusercontent.com/Johj/fergus/master/assets/heroes/' +
  arr[hero].class.toLowerCase() + '/' + hero +
  convertIndexToStar(hero, star, arr) + '.png';
}

function getHeroHeader(hero, star, arr) {
  let str =
    arr[hero].form[star].name +
    ' (' + '★'.repeat(arr[hero].form[star].star) + ') | ';
  if (arr[hero].faction !== '') {
    str += arr[hero].faction + ', ';
  }
  str += arr[hero].type + ', ' + arr[hero].class;
  return str;
}

function getHeroInstructions() {
  const embed = require('../util/embed.js').run()
    .setTitle('!hero [list|<class>|<name>] [info|stats|skill] [<star>]')
    .addField('list', 'List all heroes.\n*e.g. !hero list*', true)
    .addField('<class>', 'List all <class> heroes.\n*e.g. !hero priest*', true)
    .addField('<name>', 'Get hero image.\n*e.g. !hero mew, !hero mew 4*', true)
    .addField('info|stats|skill', 'Specify hero information.\n*e.g. !hero mew info*', true)
    .addField('<star>', 'Specify <star> information.\n*e.g. !hero mew stats 5, !hero mew 6 skill*', true)
    .setFooter('Defaults to hero\'s highest form when <star> is not specified.');
  return embed;
}

function getHeroList(arr) {
  const embed = require('../util/embed.js').run()
    .setDescription(Object.keys(arr).join(', '));
  return embed;
}

function getHeroClassList(heroClass, arr) {
  let t = [];
  Object.keys(arr).forEach((key) => {
    if (arr[key].class.toLowerCase() === heroClass) {
      t.push(key);
    }
  });
  const embed = require('../util/embed.js').run()
    .setTitle(
      heroClass.charAt(0).toUpperCase() + heroClass.substr(1).toLowerCase())
    .setDescription(t.join(', '));
  return embed;
}

function getHeroImage(hero, star, arr, footer = '') {
  const embed = require('../util/embed.js').run()
    .setImage(getHeroImageURL(hero, star, arr));
  if (footer !== '') {
    embed.setFooter(footer);
  }
  return embed;
}

function getHeroInfo(hero, star, arr, footer = '') {
  let embed = getHeroDataEmbedStarter(hero, star, arr)
    .setDescription(arr[hero].form[star].background)
    .addField('Acquire', arr[hero].form[star].howToGet.join(', '), true);
  if (footer !== '') {
    embed.setFooter(footer);
  }
  return embed;
}

function makeColumnifyData(hero, star, arr) {
  let data = [];
  for (i = 0; i < arr[hero].form[star].atkPower.length; ++i) {
    const row = {
      'TRN': (i === arr[hero].form[star].atkPower.length - 1 ? 'MAX' : `+${i}`),
      'HA': arr[hero].form[star].atkPower[i],
      'HP': arr[hero].form[star].hp[i],
      'CC': arr[hero].form[star].critChance[i],
      'ARM': arr[hero].form[star].armor[i],
      'RES': arr[hero].form[star].resistance[i],
      'CD': arr[hero].form[star].critDamage[i],
      'ACC': arr[hero].form[star].accuracy[i],
      'EVA': arr[hero].form[star].evasion[i],
    };
    data.push(row);
  }
  return data;
}

function getHeroStats(hero, star, arr, footer = '') {
  const columnify = require('columnify');
  const stats =
    '`' + columnify(makeColumnifyData(hero, star, arr))
      .replace(/(?:\r\n|\r|\n)/g, '`\n`') + '`';

  let embed = getHeroDataEmbedStarter(hero, star, arr)
    .setDescription(stats);
  if (footer !== '') {
    embed.setFooter(footer);
  }
  return embed;
}

function getHeroSkill(hero, star, arr, footer = '') {
  let embed = getHeroDataEmbedStarter(hero, star, arr)
    .addField(arr[hero].skillName + ' (Lv.' + arr[hero].form[star].skill.level + ')', arr[hero].skillDescription, true);
  if (arr[hero].form[star].skill.passive !== '') {
    embed.addField(arr[hero].passiveSkillName, arr[hero].form[star].skill.passive, true);
  }
  if (footer !== '') {
    embed.setFooter(footer);
  }
  return embed;
}

function starWithinBounds(hero, star, arr) {
  const bound = arr[hero].form.length;
  if (bound === 1) {
    return true;
  } else if (bound === 3) {
    return ([4,5,6].includes(star) ? true : false);
  } else {
    return ([1,2,3,4,5,6].includes(star) ? true : false);
  }
}

function convertStarToIndex(hero, star, arr) {
  const bound = arr[hero].form.length;
  if (bound === 1) {
    return 0;
  } else if (bound === 3) {
    return star - 4;
  } else {
    return star - 1;
  }
}

function convertIndexToStar(hero, star, arr) {
  const bound = arr[hero].form.length;
  if (bound === 1) {
    return '';
  } else if (bound === 3) {
    return star + 4;
  } else {
    if ([0,1,2].includes(star)) {
      return '';
    } else {
      return star + 1;
    }
  }
}

const arr = require('../cqdb/heroes.json');
exports.run = function(message, args) {
  args = args.join(' ').toLowerCase().split(' ');
  let embed;
  if (args.length === 1) {
    embed = getHeroInstructions();
  } else if (args.length === 2) {
    if (args[1].startsWith('list')) {
      embed = getHeroList(arr);
    } else if (
      args[1].startsWith('warrior') || args[1].startsWith('paladin') ||
      args[1].startsWith('archer') || args[1].startsWith('hunter') ||
      args[1].startsWith('wizard') || args[1].startsWith('priest')) {
      embed = getHeroClassList(args[1], arr);
    } else if (arr[args[1]]) {
      const star = arr[args[1]].form.length - 1; // highest form
      embed = getHeroImage(args[1], star, arr);
    } else {
      embed = require('../util/getError.js')
        .run(args[1], 18, ' is not a valid class or hero name!');
    }
  } else if (args.length === 3) {
    if (arr[args[1]]) {
      if (!isNaN(parseInt(args[2]))) {
        args[2] = parseInt(args[2]); // for js' weak typing
        if (starWithinBounds(args[1], args[2], arr)) {
          const star = convertStarToIndex(args[1], args[2], arr);
          embed = getHeroImage(args[1], star, arr);
        } else {
          const star = arr[args[1]].form.length - 1; // highest form
          embed = getHeroImage(args[1], star, arr, `${args[1]} does not have a ${require('../util/capStringLength.js').run(args[2], 6)}-star form! Defaulting to hero's highest form.`);
        }
      } else {
        const star = arr[args[1]].form.length - 1; // highest form
        if (args[2].startsWith('info')) {
          embed = getHeroInfo(args[1], star, arr);
        } else if (args[2].startsWith('stats')) {
          embed = getHeroStats(args[1], star, arr);
        } else if (args[2].startsWith('skill')) {
          embed = getHeroSkill(args[1], star, arr);
        } else {
          embed = getHeroImage(args[1], star, arr, '2nd argument is invalid. Try either: "info", "stats", or "skill".');
        }
      }
    } else {
      embed = require('../util/getError.js')
        .run(args[1], 18, ' is not a valid hero name!');
    }
  } else {
    if (arr[args[1]]) {
      if (!isNaN(parseInt(args[2]))) {
        args[2] = parseInt(args[2]); // for js' weak typing
        let star;
        let footer;
        if (starWithinBounds(args[1], args[2], arr)) {
          star = convertStarToIndex(args[1], args[2], arr);
          footer = '';
        } else {
          star = arr[args[1]].form.length - 1; // highest form
          footer = `${args[1]} does not have a ${require('../util/capStringLength.js').run(args[2], 6)}-star form! Defaulting to hero's highest form.`;
        }

        if (args[3].startsWith('info')) {
          embed = getHeroInfo(args[1], star, arr, footer);
        } else if (args[3].startsWith('stats')) {
          embed = getHeroStats(args[1], star, arr, footer);
        } else if (args[3].startsWith('skill')) {
          embed = getHeroSkill(args[1], star, arr, footer);
        } else {
          footer += ' 3rd argument is invalid. Try either: "info", "stats", or "skill".';
          embed = getHeroImage(args[1], star, arr, footer);
        }
      } else if (!isNaN(parseInt(args[3]))) {
        args[3] = parseInt(args[3]); // for js' weak typing
        let star;
        let footer;
        if (starWithinBounds(args[1], args[3], arr)) {
          star = convertStarToIndex(args[1], args[3], arr);
          footer = '';
        } else {
          star = arr[args[1]].form.length - 1; // highest form
          footer = `${args[1]} does not have a ${require('../util/capStringLength.js').run(args[3], 6)}-star form! Defaulting to hero's highest form.`;
        }

        if (args[2].startsWith('info')) {
          embed = getHeroInfo(args[1], star, arr, footer);
        } else if (args[2].startsWith('stats')) {
          embed = getHeroStats(args[1], star, arr, footer);
        } else if (args[2].startsWith('skill')) {
          embed = getHeroSkill(args[1], star, arr, footer);
        } else {
          footer += ' 2nd argument is invalid. Try either: "info", "stats", or "skill".';
          embed = getHeroImage(args[1], star, arr, footer);
        }
      } else {
        const star = arr[args[1]].form.length - 1; // highest form
        if (
          args[2].startsWith('info') ||
          args[2].startsWith('stats') ||
          args[2].startsWith('skill')) {
          let footer = '3nd argument is invalid. Try a <star> value.';
          if (args[2].startsWith('info')) {
            embed = getHeroInfo(args[1], star, arr, footer);
          } else if (args[2].startsWith('stats')) {
            embed = getHeroStats(args[1], star, arr, footer);
          } else {
            embed = getHeroSkill(args[1], star, arr, footer);
          }
        } else if (
          args[3].startsWith('info') ||
          args[3].startsWith('stats') ||
          args[3].startsWith('skill')) {
          let footer = '2nd argument is invalid. Try a <star> value.';
          if (args[3].startsWith('info')) {
            embed = getHeroInfo(args[1], star, arr, footer);
          } else if (args[3].startsWith('stats')) {
            embed = getHeroStats(args[1], star, arr, footer);
          } else if (args[3].startsWith('skill')) {
            embed = getHeroSkill(args[1], star, arr, footer);
          }
        } else {
          embed = getHeroImage(args[1], star, arr, '2nd and 3rd arguments are invalid. Try either: "info", "stats", or "skill" for one and a <star> value for the other.');
        }
      }
    } else {
      embed = require('../util/getError.js')
        .run(args[1], 18, ' is not a valid hero name!');
    }
  }
  message.channel.sendEmbed(embed);
};

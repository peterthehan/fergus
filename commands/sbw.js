function getSbwInstructions() {
  const embed = require('../util/embed.js').run()
    .setTitle('!sbw [list|<class>|<name>] [<star>]')
    .addField('list', 'List all sbws.\n*e.g. !sbw list*', true)
    .addField('<class>', 'List all <class> sbws.\n*e.g. !sbw orb*', true)
    .addField('<name>', 'Get hero\'s sbw information.\n*e.g. !sbw mew*', true)
    .addField('<star>', 'Get hero\'s <star> sbw information.\n*e.g. !sbw mew 4*', true)
    .setFooter('Defaults to sbw\'s highest form when <star> is not specified.');
  return embed;
}

function getSbwList(arr) {
  let t = [];
  Object.keys(arr).forEach((key) => {
    if (arr[key].form.length !== 0) {
      t.push(key);
    }
  });
  const embed = require('../util/embed.js').run()
    .setDescription(t.join(', '));
  return embed;
}

function getSbwClassList(sbwClass, arr) {
  let t = [];
  Object.keys(arr).forEach((key) => {
    if (
      arr[key].form.length !== 0 &&
      arr[key].class.toLowerCase() === sbwClass) {
      t.push(key);
    }
  });
  const embed = require('../util/embed.js').run()
    .setTitle(
      sbwClass.charAt(0).toUpperCase() +
      sbwClass.substr(1).toLowerCase())
    .setDescription(t.join(', '));
  return embed;
}

// helper function, get string
function getStats(h, s, arr) {
  return '__**' + arr[h].form[s].name + '**__ ' +
    '(' + '★'.repeat(arr[h].form[s].star) + ')\n```' +
    'Atk. Power: ' + arr[h].form[s].atkPower + '\n' +
    'Atk. Speed: ' + arr[h].form[s].atkSpeed + '```\n' +
    '**Ability**: ' + arr[h].form[s].ability;
}

function getSbwInfo(hero, star, arr, footer = '') {
  let embed = require('../util/embed.js').run()
    .setThumbnail(
      'https://raw.githubusercontent.com/Johj/fergus/master/assets/sbws/' +
      arr[hero].class.toLowerCase() + '/' + hero + arr[hero].form[star].star +
      '.png')
    .setTitle(
      arr[hero].form[star].name +
      ' (' + '★'.repeat(arr[hero].form[star].star) + ')')
    .setDescription(arr[hero].form[star].ability)
    .addField('Atk. Power', arr[hero].form[star].atkPower, true)
    .addField('Atk. Speed', arr[hero].form[star].atkSpeed, true);
  if (footer !== '') {
    embed.setFooter(footer);
  }
  return embed;
}

function getSbwError(error, cap, message) {
  const embed = require('../util/embed.js').run()
    .setDescription(
      `${capStringLength(error, cap)}${message}`);
  return embed;
}

function convertStarToIndex(star) {
  return star - 4;
}

// helper function
function capStringLength(s, max) {
  let str = s.toString();
  if (str.length > max && str.length - 6 > 0) {
    str = str.substr(0, 3) + '...' + str.substr(str.length - 3, str.length - 1);
  }
  return str;
}

const arr = require('../cqdb/sbws.json');
exports.run = function(message, args) {
  let embed;
  if (args.length === 1) {
    embed = getSbwInstructions();
  } else if (args.length === 2) {
    if (args[1].startsWith('list')) {
      embed = getSbwList(arr);
    } else if (
      args[1].startsWith('sword') || args[1].startsWith('hammer') ||
      args[1].startsWith('bow') || args[1].startsWith('gun') ||
      args[1].startsWith('staff') || args[1].startsWith('orb')) {
      embed = getSbwClassList(args[1], arr);
    } else if (arr[args[1]]) {
      if (arr[args[1]].form.length !== 0) {
        const star = arr[args[1]].form.length - 1; // highest form
        embed = getSbwInfo(args[1], star, arr);
      } else {
        embed = getSbwError(args[1], 18, ' does not have an sbw yet!');
      }
    } else {
      embed = getSbwError(args[1], 18, ' is not a valid class or hero name!');
    }
  } else {
    if (arr[args[1]]) {
      if (arr[args[1]].form.length !== 0) {
        if (!isNaN(parseInt(args[2]))) {
          args[2] = parseInt(args[2]);
          let star = arr[args[1]].form.length - 1; // highest form
          let footer = '';
          if (args[2] > 3 && args[2] < 7) {
            star = convertStarToIndex(args[2]);
          } else {
            footer = `${args[1]}'s sbw does not have a ${capStringLength(args[2], 6)}-star form! Defaulting to sbw's highest form.`
          }
          embed = getSbwInfo(args[1], star, arr, footer);
        } else {
          const star = arr[args[1]].form.length - 1; // highest form
          embed = getSbwInfo(args[1], star, arr, '2nd argument is invalid. Try a <star> value between 4 and 6.');
        }
      } else {
        embed = getSbwError(args[1], 18, ' does not have an sbw yet!');
      }
    } else {
      embed = getSbwError(args[1], 18, ' is not a valid hero name!');
    }
  }
  message.channel.sendEmbed(embed);
};

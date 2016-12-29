function getWeaponInstructions() {
  const embed = require('../util/embed.js').run()
    .setTitle('!weapon [list|<star>|<class>|<name>]')
    .addField('list', 'List all weapons.\n*e.g. !weapon list*', true)
    .addField('<star>', 'List all <star> weapons.\n*e.g. !weapon 4*', true)
    .addField('<class>', 'List all <class> weapons.\n*e.g. !weapon sword*', true)
    .addField('<name>', 'Get weapon information.\n*e.g. !weapon redfalchion*');
  return embed;
}

function getWeaponList(arr) {
  const embed = require('../util/embed.js').run()
    .setDescription(Object.keys(arr).join(', '));
  return embed;
}

function getWeaponStarList(star, arr) {
  let t = [];
  Object.keys(arr).forEach((key) => {
    if (arr[key].star === star) {
      t.push(key);
    }
  });
  const embed = require('../util/embed.js').run()
    .setTitle('(' + '★'.repeat(star) + ')')
    .setDescription(t.join(', '));
  return embed;
}

function getWeaponClassList(weaponClass, arr) {
  let t = [];
  Object.keys(arr).forEach((key) => {
    if (arr[key].class.toLowerCase() === weaponClass) {
      t.push(key);
    }
  });
  const embed = require('../util/embed.js').run()
    .setTitle(
      weaponClass.charAt(0).toUpperCase() +
      weaponClass.substr(1).toLowerCase())
    .setDescription(t.join(', '));
  return embed;
}

function getWeaponInfo(weapon, arr) {
  let embed = require('../util/embed.js').run()
    .setThumbnail(
      'https://raw.githubusercontent.com/Johj/fergus/master/assets/weapons/' +
      arr[weapon].class.toLowerCase() + '/' + weapon + '.png')
    .setTitle(arr[weapon].name + ' (' + '★'.repeat(arr[weapon].star) + ') | ' + arr[weapon].class)
    .addField('Atk. Power', arr[weapon].atkPower, true)
    .addField('Atk. Speed', arr[weapon].atkSpeed, true);
    if (arr[weapon].options.length !== 0) {
      embed.addField('Options', arr[weapon].options.join(', '), true);
    }
    embed.addField('Acquire', arr[weapon].howToGet.join(', '), true);
  return embed;
}

const arr = require('../cqdb/weapons.json');
exports.run = function(message, args) {
  let embed;
  if (args.length === 1) {
    embed = getWeaponInstructions();
  } else {
    if (args[1].startsWith('list')) {
      embed = getWeaponList(arr);
    } else if (!isNaN(parseInt(args[1]))) {
      args[1] = parseInt(args[1]); // for js' weak typing
      if (args[1] > 0 && args[1] < 7) {
        embed = getWeaponStarList(args[1], arr);
      } else {
        embed = require('../util/getError.js')
          .run(args[1], 6, '-star weapons do not exist!');
      }
    } else {
      if (
        args[1].startsWith('sword') || args[1].startsWith('hammer') ||
        args[1].startsWith('bow') || args[1].startsWith('gun') ||
        args[1].startsWith('staff') || args[1].startsWith('orb')) {
        embed = getWeaponClassList(args[1], arr);
      } else if (arr[args[1]]) {
        embed = getWeaponInfo(args[1], arr);
      } else {
        embed = require('../util/getError.js')
          .run(args[1], 15, ' is not a valid weapon class or name!');
      }
    }
  }
  message.channel.sendEmbed(embed);
};

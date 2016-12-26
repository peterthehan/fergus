function getWeaponEmbedStarter() {
  const discord = require('discord.js');
  const embed = new discord.RichEmbed().setColor('#ebb74e');
  return embed;
}

function getWeaponInstructions() {
  const embed = getWeaponEmbedStarter()
    .setTitle('!weapon [list|<star>|<class>|<name>]')
    .addField('list', 'List all weapons.\n*e.g. !weapon list*', true)
    .addField('<star>', 'List all <star> weapons.\n*e.g. !weapon 4*', true)
    .addField('<class>', 'List all <class> weapons.\n*e.g. !weapon sword*', true)
    .addField('<name>', 'Get weapon information.\n*e.g. !weapon redfalchion*');
  return embed;
}

function getWeaponList(arr) {
  const embed = getWeaponEmbedStarter()
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
  const embed = getWeaponEmbedStarter()
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
  const embed = getWeaponEmbedStarter()
    .setTitle(
      weaponClass.charAt(0).toUpperCase() +
      weaponClass.substr(1).toLowerCase())
    .setDescription(t.join(', '));
  return embed;
}

function getWeaponInfo(weapon, arr) {
  let embed = getWeaponEmbedStarter()
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

function getWeaponError(error, cap, message) {
  const embed = getWeaponEmbedStarter()
    .setDescription(
      `${capStringLength(error, cap)}${message}`);
  return embed;
}

// helper function
function capStringLength(s, max) {
  let str = s.toString();
  if (str.length > max && str.length - 6 > 0) {
    str = str.substr(0, 3) + '...' + str.substr(str.length - 3, str.length - 1);
  }
  return str;
}

function getWeapon(args, arr) {
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
        embed = getWeaponError(args[1], 6, '-star weapons do not exist!');
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
        embed = getWeaponError(args[1], 15, ' is not a valid weapon class or name!');
      }
    }
  }
  return embed;
}

module.exports = {getWeapon};

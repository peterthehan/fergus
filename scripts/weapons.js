function getWeaponInstructions() {
  const discord = require('discord.js');
  const embed = new discord.RichEmbed()
    .setColor('#ebb74e')
    .setTitle('!weapon [list|<star>|<class>|<name>]')
    .addField('list', 'List all weapons.\n*e.g. !weapon list*', true)
    .addField('<star>', 'List all <star> weapons.\n*e.g. !weapon 4*', true)
    .addField('<class>', 'List all <class> weapons.\n*e.g. !weapon sword*', true)
    .addField('<name>', 'Get weapon information.\n*e.g. !weapon redfalchion*');
  return embed;
}

function getWeaponList(arr) {
  const discord = require('discord.js');
  const embed = new discord.RichEmbed()
    .setColor('#ebb74e')
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
  const discord = require('discord.js');
  const embed = new discord.RichEmbed()
    .setColor('#ebb74e')
    .setTitle('(' + '★'.repeat(star) + ')')
    .setDescription(t.join(', '));
  return embed;
}

function getWeaponClassList(clas, arr) {
  let t = [];
  Object.keys(arr).forEach((key) => {
    if (arr[key].class.toLowerCase() === clas) {
      t.push(key);
    }
  });
  const discord = require('discord.js');
  const embed = new discord.RichEmbed()
    .setColor('#ebb74e')
    .setTitle(clas.charAt(0).toUpperCase() + clas.substr(1).toLowerCase())
    .setDescription(t.join(', '));
  return embed;
}

function getWeaponInfo(weapon, arr) {
  const discord = require('discord.js');
  const embed = new discord.RichEmbed()
    .setColor('#ebb74e')
    .setTitle(arr[weapon].name + ' (' + '★'.repeat(arr[weapon].star) + ') | ' + arr[weapon].class)
    .addField('Atk. Power', arr[weapon].atkPower, true)
    .addField('Atk. Speed', arr[weapon].atkSpeed, true)
    .addField('Options', arr[weapon].options.join(', '), true)
    .addField('Acquire', arr[weapon].howToGet.join(', '), true);
  return embed;
}

function getWeaponStarError(star) {
  star = capStringLength(star, 6);
  const discord = require('discord.js');
  const embed = new discord.RichEmbed()
    .setColor('#ebb74e')
    .setDescription(star + '-star weapons do not exist!');
  return embed;
}

function getWeaponNameError(name) {
  name = capStringLength(name, 15);
  const discord = require('discord.js');
  const embed = new discord.RichEmbed()
    .setColor('#ebb74e')
    .setDescription(name + ' is not a valid weapon class or name!');
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
    if (args[1] === 'list') {
      embed = getWeaponList(arr);
    } else if (!isNaN(parseInt(args[1]))){
      args[1] = parseInt(args[1]); // for js' weak typing
      if (args[1] > 0 && args[1] < 7) {
        embed = getWeaponStarList(args[1], arr);
      } else {
        embed = getWeaponStarError(args[1]);
      }
    } else {
      if (
        args[1] === 'sword' || args[1] === 'hammer' ||
        args[1] === 'bow' || args[1] === 'gun' ||
        args[1] === 'staff' || args[1] === 'orb') {
        embed = getWeaponClassList(args[1], arr);
      } else if (arr[args[1]]) {
        embed = getWeaponInfo(args[1], arr);
      } else {
        embed = getWeaponNameError(args[1]);
      }
    }
  }
  return embed;
}

module.exports = {getWeapon};

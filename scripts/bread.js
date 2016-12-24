function getBreadEmbedStarter() {
  const discord = require('discord.js');
  const embed = new discord.RichEmbed().setColor('#ebb74e');
  return embed;
}

function getBreadInstructions() {
  const embed = getBreadEmbedStarter()
    .setTitle('!bread [list|<star>|<name>]')
    .addField('list', 'List all breads.\n*e.g. !bread list*', true)
    .addField('<star>', 'List all <star> breads.\n*e.g. !bread 4*', true)
    .addField('<name>', 'Get bread information.\n*e.g. !bread macaroon*', true);
  return embed;
}

function getBreadList(arr) {
  const embed = getBreadEmbedStarter()
    .setDescription(Object.keys(arr).join(', '));
  return embed;
}

function getBreadStarList(star, arr) {
  let t = [];
  Object.keys(arr).forEach((key) => {
    if (arr[key].star === star) {
      t.push(key);
    }
  });
  const embed = getBreadEmbedStarter()
    .setTitle('(' + '★'.repeat(star) + ')')
    .setDescription(t.join(', '));
  return embed;
}

function getBreadInfo(bread, arr) {
  const embed = getBreadEmbedStarter()
    .setThumbnail(
      'https://raw.githubusercontent.com/Johj/fergus/master/assets/bread/' +
      bread + '.png')
    .setTitle(arr[bread].name + ' (' + '★'.repeat(arr[bread].star) + ')')
    .addField('Value', arr[bread].value, true)
    .addField('Great rate', arr[bread].greatRate * 100 + '%', true)
    .addField('Sell', arr[bread].sell, true);
  return embed;
}

function getBreadStarError(star) {
  const embed = getBreadEmbedStarter()
    .setDescription(
      `${capStringLength(star, 6)}-star breads do not exist!`);
  return embed;
}

function getBreadNameError(bread) {
  const embed = getBreadEmbedStarter()
    .setDescription(
      `${capStringLength(bread, 19)} is not a valid bread name!`);
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

function getBread(args, arr) {
  let embed;
  if (args.length === 1) {
    embed = getBreadInstructions();
  } else {
    if (args[1].startsWith('list')) {
      embed = getBreadList(arr);
    } else if (!isNaN(parseInt(args[1]))) {
      args[1] = parseInt(args[1]); // for js' weak typing
      if (args[1] > 0 && args[1] < 7) {
        embed = getBreadStarList(args[1], arr);
      } else {
        embed = getBreadStarError(args[1]);
      }
    } else {
      if (arr[args[1]]) {
        embed = getBreadInfo(args[1], arr);
      } else {
        embed = getBreadNameError(args[1]);
      }
    }
  }
  return embed;
}

module.exports = {getBread};

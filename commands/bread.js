function getBreadInstructions() {
  const embed = require('../util/embed.js').run()
    .setTitle('!bread [list|<star>|<name>]')
    .addField('list', 'List all breads.\n*e.g. !bread list*', true)
    .addField('<star>', 'List all <star> breads.\n*e.g. !bread 4*', true)
    .addField('<name>', 'Get bread information.\n*e.g. !bread macaroon*', true);
  return embed;
}

function getBreadList(arr) {
  const embed = require('../util/embed.js').run()
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
  const embed = require('../util/embed.js').run()
    .setTitle('(' + '★'.repeat(star) + ')')
    .setDescription(t.join(', '));
  return embed;
}

function getBreadInfo(bread, arr) {
  const embed = require('../util/embed.js').run()
    .setThumbnail(
      'https://raw.githubusercontent.com/Johj/fergus/master/assets/bread/' +
      bread + '.png')
    .setTitle(arr[bread].name + ' (' + '★'.repeat(arr[bread].star) + ')')
    .addField('Value', arr[bread].value, true)
    .addField('Great rate', arr[bread].greatRate * 100 + '%', true)
    .addField('Sell', arr[bread].sell, true);
  return embed;
}

const arr = require('../cqdb/bread.json');
module.exports.run = (message, args) => {
  let embed;
  if (args.length === 1) {
    embed = getBreadInstructions();
  } else {
    args = args.join(' ').toLowerCase().split(' ');
    if (args[1].startsWith('list')) {
      embed = getBreadList(arr);
    } else if (!isNaN(parseInt(args[1]))) {
      args[1] = parseInt(args[1]); // for js' weak typing
      if (args[1] > 0 && args[1] < 7) {
        embed = getBreadStarList(args[1], arr);
      } else {
        embed = require('../util/getError.js')
          .run(args[1], 6, '-star breads do not exist!');
      }
    } else {
      if (arr[args[1]]) {
        embed = getBreadInfo(args[1], arr);
      } else {
        embed = require('../util/getError.js')
          .run(args[1], 19, ' is not a valid bread name!');
      }
    }
  }
  message.channel.sendEmbed(embed);
};

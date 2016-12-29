function getGoddessInstructions() {
  const embed = require('../util/embed.js').run()
    .setTitle('!goddess [list|<name>]')
    .addField('list', 'List all goddesses.\n*e.g. !goddess list*', true)
    .addField('<name>', 'Get goddess information.\n*e.g. !goddess sera*', true);
  return embed;
}

function getGoddessList(arr) {
  const embed = require('../util/embed.js').run()
    .setDescription(Object.keys(arr).join(', '));
  return embed;
}

function getGoddessInfo(goddess, arr) {
  const embed = require('../util/embed.js').run()
    .setThumbnail(
      'https://raw.githubusercontent.com/Johj/fergus/master/assets/goddesses/' +
      goddess + '.png')
    .setTitle(arr[goddess].name)
    .addField(
      arr[goddess].skillName,
      arr[goddess].skillDescription,
      true
    );
  return embed;
}

const arr = require('../cqdb/goddesses.json');
exports.run = function(message, args) {
  let embed;
  if (args.length === 1) {
    embed = getGoddessInstructions();
  } else {
    if (args[1].startsWith('list')) {
      embed = getGoddessList(arr);
    } else {
      if (arr[args[1]]) {
        embed = getGoddessInfo(args[1], arr);
      } else {
        embed = require('../util/getError.js')
          .run(args[1], 15, ' is not a valid goddess name!');
      }
    }
  }
  message.channel.sendEmbed(embed);
};

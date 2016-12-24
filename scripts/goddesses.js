function getGoddessEmbedStart() {
  const discord = require('discord.js');
  const embed = new discord.RichEmbed().setColor('#ebb74e');
  return embed;
}

function getGoddessInstructions() {
  const embed = getGoddessEmbedStart()
    .setTitle('!goddess [list|<name>]')
    .addField('list', 'List all goddesses.\n*e.g. !goddess list*', true)
    .addField('<name>', 'Get goddess information.\n*e.g. !goddess sera*', true);
  return embed;
}

function getGoddessList(arr) {
  const embed = getGoddessEmbedStart()
    .setDescription(Object.keys(arr).join(', '));
  return embed;
}

function getGoddessInfo(goddess, arr) {
  const embed = getGoddessEmbedStart()
    .setTitle(arr[goddess].name)
    .addField(
      arr[goddess].skillName,
      arr[goddess].skillDescription,
      true
    );
  return embed;
}

function getGoddessNameError(goddess) {
  const embed = getGoddessEmbedStart()
    .setDescription(
      `${capStringLength(goddess, 15)} is not a valid goddess name!`);
  return embed;
}

// helper function
function capStringLength(s, max) {
  let str = s.toString();
  if (str.length > max && str.length - 6 > 0) {
    str =
      str.substr(0, 3) + '...' + str.substr(str.length - 3, str.length - 1);
  }
  return str;
}

function getGoddess(args, arr) {
  let embed;
  if (args.length === 1) {
    embed = getGoddessInstructions();
  }
  else {
    if (args[1].startsWith('list')) {
      embed = getGoddessList(arr);
    } else {
      if (arr[args[1]]) {
        embed = getGoddessInfo(args[1], arr);
      } else {
        embed = getGoddessNameError(args[1]);
      }
    }
  }
  return embed;
}

﻿module.exports = {getGoddess};

function getSkinEmbedStarter() {
  const discord = require('discord.js');
  const embed = new discord.RichEmbed().setColor('#ebb74e');
  return embed;
}

function getSkinInstructions() {
  const embed = getSkinEmbedStarter()
    .setTitle('!skin [list|<name>]')
    .addField('list', 'List all skins.\n*e.g. !skin list*', true)
    .addField('<name>', 'Get skin information.\n*e.g. !skin mew*', true);
  return embed;
}

function getSkinList(arr) {
  let t = [];
  Object.keys(arr).forEach((key) => {
    if(arr[key].form.length !== 0) {
      t.push(key);
    }
  });
  const embed = getSkinEmbedStarter()
    .setDescription(t.join(', '));
  return embed;
}

function getSkinInfo(hero, arr) {
  let embed = getSkinEmbedStarter();
  for (i = 0; i < arr[hero].form.length; ++i) {
    let str = '';
    if (arr[hero].form[i].atkPower !== 0) {
      str += 'Atk. Power: ' + arr[hero].form[i].atkPower + '\n';
    }
    if (arr[hero].form[i].hp !== 0) {
      str += 'HP: ' + arr[hero].form[i].hp + '\n';
    }
    if(arr[hero].form[i].critChance !== 0) {
      str += 'Crit.Chance: ' + arr[hero].form[i].critChance * 100 + '%\n';
    }
    if(arr[hero].form[i].armor !== 0) {
      str += 'Armor: ' + arr[hero].form[i].armor + '\n';
    }
    if(arr[hero].form[i].resistance !== 0) {
      str += 'Resistance: ' + arr[hero].form[i].resistance + '\n';
    }
    if(arr[hero].form[i].critDamage !== 0) {
      str += 'Crit.Damage: ' + arr[hero].form[i].critDamage * 100 + '%\n';
    }
    if(arr[hero].form[i].accuracy !== 0) {
      str += 'Accuracy: ' + arr[hero].form[i].accuracy * 100 + '%\n';
    }
    if(arr[hero].form[i].evasion !== 0) {
      str += 'Evasion: ' + arr[hero].form[i].evasion * 100 + '%\n';
    }
    embed.addField(arr[hero].form[i].name, str, true);
  }
  return embed;
}

function getSkinError(error, cap, message) {
  const embed = getSkinEmbedStarter()
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

function getSkin(args, arr) {
  let embed;
  if (args.length === 1) {
    embed = getSkinInstructions();
  }
  else {
    if (args[1].startsWith('list')) {
      embed = getSkinList(arr);
    }
    else if(arr[args[1]]) {
      if(arr[args[1]].form.length !== 0) {
        embed = getSkinInfo(args[1], arr);
      }
      else {
        embed = getSkinError(args[1], 18, ' does not have a skin yet!');
      }
    }
    else {
      embed = getSkinError(args[1], 18, ' is not a valid hero name!');
    }
  }
  return embed;
}

module.exports = {getSkin};

const bread = require('../Decrypted/get_bread.json')['bread'];
const character_visual = require('../Decrypted/get_character_visual.json')['character_visual'].filter(element => element['type'] === 'HERO'); // 662
const weapon = require('../Decrypted/get_weapon.json')['weapon']
  .filter(element => element['rarity'] === 'NORMAL' || element['rarity'] === 'ANTIQUE' || (element['rarity'] === 'BAIT' && element['name'] !== 'NULL'));

const co = require('../util/countInstances.js');
const fi = require('../util/filter.js');
const pl = require('../util/plurality.js');
const re = require('../util/resolve.js');
const tr = require('../util/truncateString.js');

const options = '[bread|hero|weapon]';

findInstructions = () => {
  return {
    title: `!find ${options} [<name>]`,
    fields: [
      {
        name: `${options} <name>`,
        value: `List all instances of ${options}'s <name>.\n*e.g. !find bread donut, !find hero lee*`,
        inline: true
      }
    ]
  };
}

find = (name, data) => {
  const filtered = fi.filter(name, data, 'name');
  const truncatedFilteredString = tr.truncateString(filtered.map(currentValue => re.resolve(currentValue['name'])).join(', '));
  return {
    title: `Displaying ${co.countInstances(truncatedFilteredString, ',') + 1} of ${filtered.length} result${pl.plurality(filtered.length)} found`,
    description: truncatedFilteredString
  };
}

getData = (data) => {
  if (data === 'hero') {
    return character_visual;
  } else if (data === 'bread') {
    return bread;
  } else if (data === 'weapon') {
    return weapon;
  }
  return null;
}

exports.run = (message, args) => {
  const content = '';
  let embed = {};

  if (args.length === 0) {
    embed = findInstructions();
  } else {
    const arg0 = args.shift();
    const data = getData(arg0);
    if (data !== null) {
      embed = find(args, data);
    } else {
      embed = { title: 'Error', description: `${arg0} is not a valid parameter! Choose from ${options}.` };
    }
  }

  message.channel.sendMessage(content, { embed: embed });
}

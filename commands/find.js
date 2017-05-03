const bread = require('../Decrypted/get_bread.json')['bread'];
const character_visual = require('../Decrypted/get_character_visual.json')['character_visual'].filter(element => element['type'] === 'HERO'); // 662
const costume = require('../Decrypted/get_costume.json')['costume'];
const skill = require('../Decrypted/get_spskill.json')['spskill'];
const weapon = require('../Decrypted/get_weapon.json')['weapon']
  .filter(element => element['rarity'] === 'NORMAL' || element['rarity'] === 'ANTIQUE' || (element['rarity'] === 'BAIT' && element['name'] !== 'NULL'));

const countInstances = require('../util/countInstances.js');
const filter = require('../util/filter.js');
const plurality = require('../util/plurality.js');
const resolve = require('../util/resolve.js');
const truncateString = require('../util/truncateString.js');

const options = '[bread|hero|skill|skin|weapon]';

findInstructions = () => {
  return {
    title: `!find ${options} [<name>]`,
    fields: [
      {
        name: `${options} <name>`,
        value: `List all occurences of <name>.\n*e.g. !find bread donut, !find skin halloween*`,
        inline: true
      }
    ]
  };
}

find = (name, data) => {
  const filtered = filter(name, data[0], data[1], false); // isStrongFilter = false

  let title;
  let description;
  if (filtered.length === 0) {
    description = '';
    title = 'No results found!';
  } else {
    // remove duplicate results, particularly from skill
    const results = [...new Set(filtered.map(currentValue => resolve(currentValue[data[1]])))];
    description = truncateString(results.join(', '));
    title = `Displaying ${countInstances(description, ',') + 1} of ${results.length} result${plurality(results.length)} found`;
  }

  return {
    title: title,
    description: description
  };
}

getData = (data) => {
  if (data === 'hero') {
    return [character_visual, 'name'];
  } else if (data === 'bread') {
    return [bread, 'name'];
  } else if (data === 'skill') {
    return [skill, 'name'];
  } else if (data === 'skin') {
    return [costume, 'costume_name'];
  } else if (data === 'weapon') {
    return [weapon, 'name'];
  }
  return null;
}

exports.run = (message, args) => {
  let embed = {};

  if (args.length === 0) {
    embed = findInstructions();
  } else {
    const arg0 = args.shift();
    const data = getData(arg0);
    embed = data !== null
      ? find(args, data)
      : { title: 'Error', description: `${arg0} is not a valid parameter! Choose from ${options}.` };
  }

  message.channel.send({ embed: embed });
  return true;
}

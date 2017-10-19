const d = require('../data.js');
const character_visual = d.character_visual()
  .filter(element => element['domain']);

const embed = require('../util/embed.js');
const imagePath = require('../util/imagePath.js');
const normalizedLevenshtein = require('../util/normalizedLevenshtein.js');
const removeDuplicates = require('../util/removeDuplicates.js');
const resolve = require('../util/resolve.js');

factionInstructions = () => {
  const names = ['list', '<name>',];
  const values = [
    `List all factions.\n*e.g. !faction list*`,
    'Filter heroes by faction <name>.\n*e.g. !faction grancia*',
  ];
  const inlines = [true, true,];

  return embed.process({
    title: '!faction [list|<name>]',
    fields: embed.fields(names, values, inlines),
  });
}

factionList = () => {
  return embed.process({ description: factionObj()[0].join(', '), });
}

factionInfo = (args) => {
  const factions = factionObj();
  const index = factionFuzzy(args, factions[0]);

  const filtered = character_visual
    .filter(element => element['domain'] === factions[1][index]);

  return embed.process({
    title: factions[0][index],
    description: filtered
      .map(currentValue => resolve(currentValue['name']))
      .join(', '),
    thumbnail: {
      url: factions[1][index] === 'NONEGROUP'
        ? ''
        : imagePath(`factions/${factions[1][index]}`),
    },
  });
}

// helper function
factionObj = () => {
  const factions = removeDuplicates(character_visual
    .map(currentValue => currentValue['domain'])
  );

  // remove unreleased domains
  ['CHEN',].map(currentValue => {
    const index = factions.indexOf(currentValue);
    factions.splice(index, 1);
  });

  const resolvedFactions = factions.map(currentValue => {
    return resolve(currentValue === 'NONEGROUP'
      ? 'TEXT_CHAMP_DOMAIN_' + currentValue + '_NAME'
      : 'TEXT_CHAMPION_DOMAIN_' + currentValue
    );
  });

  return [resolvedFactions, factions];
}

// TODO generalize fuzzy to work with domains
// helper function
factionFuzzy = (args, factions) => {
  args = args.join(' ').toLowerCase();
  const distances = factions.map(currentValue => {
    return normalizedLevenshtein(args, currentValue);
  });

  return distances.indexOf(Math.min(...distances));
}

exports.run = (message, args) => {
  let e;
  if (!args.length) {
    e = factionInstructions();
  } else {
    e = args[0].toLowerCase().startsWith('list')
      ? factionList()
      : factionInfo(args);
  }

  message.channel.send({ embed: e, });
}

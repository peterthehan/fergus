const { getValidLanguageCodes, } = require('./localize.js');

module.exports = {
  // defaults to null
  parseGrade: (args) => {
    const validGrades = [...Array(7).keys()].slice(1); // [1, 2, 3, 4, 5, 6,]
    return args.find(i => validGrades.includes(parseInt(i, 10))) || null;
  },
  // defaults to en
  parseLanguageCode: (args) => {
    const validLanguageCodes = getValidLanguageCodes();
    return validLanguageCodes.find(i => args.includes(i)) || validLanguageCodes[0];
  },
  parseQuery: (args, remove) => {
    // remove empty strings
    args = args.filter(i => i);

    remove.forEach(i => {
      const index = args.indexOf(i);
      if (index > -1) {
        args.splice(index, 1);
      }
    });

    return args.join(' ');
  },
};

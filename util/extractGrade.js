module.exports = extractGrade = (id) => parseInt(id.match(/_\d/)[0].match(/\d/)[0]);

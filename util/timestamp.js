const moment = require('moment');

module.exports = timestamp = (time) => {
  return moment(time).format('ddd MMM Do, YYYY [at] HH:mm:ss');
}

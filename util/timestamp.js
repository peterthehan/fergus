const moment = require('moment');

module.exports = timestamp = (message) => {
  return moment(message.createdAt).format('ddd MMM Do, YYYY [at] HH:mm:ss');
}

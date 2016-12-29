let count = 0;
module.exports = {
  getCount: function() {
    return count;
  },
  incrementCount: function() {
    ++count;
  }
};

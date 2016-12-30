let count = 0;
module.exports = {
  getCount: function() {
    return count;
  },
  incrementCount: function() {
    ++count;
  },
  resetCount: function() {
    count = 0;
  }
};

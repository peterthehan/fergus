const userTimers = {};

module.exports = {
  exists: (id) => {
    return id in userTimers;
  },

  getTimers: () => {
    return userTimers;
  },

  // 900000 ms = 15 minutes
  addTimer: (message, content, time = 900000) => {
    const userTimer = setTimeout(() => {
      module.exports.removeTimer(message.author.id);
      message.author.send(content);
    }, time);

    userTimers[message.author.id] = { 'timer': userTimer, 'start': Date.now() };
  },

  removeTimer: (id) => {
    clearTimeout(userTimers[id]['timer']);
    delete userTimers[id];
  },

  // in ms
  getRemainingTime: (id) => {
    return userTimers[id]['timer']._idleTimeout - (Date.now() - userTimers[id]['start']);
  }
};

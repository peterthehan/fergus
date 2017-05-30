const removeDuplicates = require('../util/removeDuplicates.js');

class Count {
  constructor() {
    this.count = {};
  }

  increment(message, command) {
    if (!this.count[message.author.id]) {
      this.count[message.author.id] = {};
    }
    if (!this.count[message.author.id][command]) {
      this.count[message.author.id][command] = 0;
    }
    ++this.count[message.author.id][command];
  }

  reset() {
    this.count = {};
  }

  sum(command = null) {
    return Object
      .keys(this.count)
      .map(currentValue => this.userSum(currentValue, command))
      .reduce(((accumulator, currentValue) => accumulator + currentValue), 0);
  }

  // helper function
  userSum(id, command = null) {
    if (!command) {
      return Object
        .values(this.count[id])
        .reduce(((accumulator, currentValue) => accumulator + currentValue), 0);
    }
    return this.count[id][command] ? this.count[id][command] : 0;
  }

  commandFrequency(size) {
    const commandsUsed = removeDuplicates(Object
      .values(this.count)
      .map(currentValue => Object.keys(currentValue))
      .reduce(((a, b) => a.concat(b)), [])
    );

    const sorted = commandsUsed
      .map(currentValue => {
        return { command: currentValue, sum: this.sum(currentValue), };
      })
      .sort((a, b) => b.sum - a.sum)
      .map(currentValue => `${currentValue.sum} ${currentValue.command}`);

    console.log(sorted.join(', '));
    return sorted.slice(0, size).join('\n');
  }
}

module.exports = Count;

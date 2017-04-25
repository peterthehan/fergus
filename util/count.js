class Count {
  constructor(count = 0) {
    this.count = count;
  }

  toString() {
    return this.count;
  }

  reset() {
    this.count = 0;
  }

  increment() {
    ++this.count;
  }
}

module.exports = Count;

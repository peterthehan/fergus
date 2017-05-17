class Count {
  constructor(count = 0) {
    this.count = count;
  }

  toString() {
    return this.count;
  }

  reset(count = 0) {
    this.count = count;
  }

  increment() {
    ++this.count;
  }
}

module.exports = Count;

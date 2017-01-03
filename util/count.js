class Count {
  constructor() {
    this.count = 0;
  }
  getCount() {
    return this.count;
  }
  resetCount() {
    this.count = 0;
  }
  incrementCount() {
    ++this.count;
  }
}

module.exports = Count;

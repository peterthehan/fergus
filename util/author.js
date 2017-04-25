class Author {
  constructor(id = '206161807491072000') {
    this.id = id;
  }

  toString() {
    return this.id;
  }

  mention(message) {
    return message.client.users.get(this.id).toString();
  }
}

module.exports = Author;

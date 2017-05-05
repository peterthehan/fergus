module.exports = repeat = (n, callback) => {
  return Array.from(Array(n), callback);
}

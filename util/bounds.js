module.exports = bounds = (arr) => {
  return arr.sort((a, b) => a - b)[1]; // median
}

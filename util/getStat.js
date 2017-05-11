module.exports = getStat = (base, growth, level, training = 5) => {
  return (((level - 1) * growth) + base) * (training / 10 + 1);
}

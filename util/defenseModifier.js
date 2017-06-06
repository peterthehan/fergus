module.exports = defenseModifier = (defense, isReduction = true) => {
  return isReduction ? 1 - 1 / (1 + defense * 0.0034) : (1 + defense * 0.0034);
}

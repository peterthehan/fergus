module.exports = extractGradeArg = (args) => {
  if (args.length >= 2 && !isNaN(args[args.length - 1])) {
    const potentialGrade = parseInt(args[args.length - 1]);
    if (potentialGrade >= 1 && potentialGrade <= 6) {
      args.pop();
      return potentialGrade;
    }
  }
  return null;
}

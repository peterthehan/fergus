module.exports = extractGradeArg = (args, gradeMax = 6) => {
  if (args.length >= 2 && !isNaN(args[args.length - 1])) {
    const potentialGrade = parseInt(args[args.length - 1]);
    if (potentialGrade >= 1 && potentialGrade <= gradeMax) {
      args.pop();
      return potentialGrade;
    }
  }
  return null;
}

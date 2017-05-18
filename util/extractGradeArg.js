module.exports = extractGradeArg = (args, gradeMax = 6) => {
  if (args.length < 2 || isNaN(args[args.length - 1])) {
    return null;
  }

  const grade = parseInt(args[args.length - 1]);

  if (grade < 1 || grade > gradeMax) {
    return null;
  }

  args.pop(); // remove grade from args
  return grade;
}

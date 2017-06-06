module.exports = parseTrainingArgs = (args) => {
  let berry = null;
  let bread = null;
  let level = null;
  let grade = null;

  if (args.length >= 5 && ['true', 'false'].includes(args[args.length - 1])) {
    berry = args.pop().toLowerCase() === 'true';
    bread = parseInt(args.pop());
    level = parseInt(args.pop());
    grade = args.pop();
  } else if (args.length >= 2
    && ['1', '2', '3', '4', '5', '6'].includes(args[args.length - 1])
  ) {
    grade = args.pop();
  }

  grade = ['1', '2', '3', '4', '5', '6'].includes(grade)
    ? parseInt(grade)
    : null;

  return [grade, level, bread, berry,];
}

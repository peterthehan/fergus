module.exports = (error) => {
  console.error(`uncaught promise error:\n${error.stack}`);
};

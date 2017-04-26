exports.error = (input, errorMessage) => {
  return {
    description: input + errorMessage
  };
}

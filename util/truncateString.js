exports.truncateString = (str, delimiter = ',', limit = 1024) => {
  if (str.length > limit) {
    str = str.substr(0, limit);
    const index = str.lastIndexOf(delimiter);
    str = str.substr(0, index) + '...';
  }
  return str;
};

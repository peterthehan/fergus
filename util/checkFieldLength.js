module.exports.run = (str, delimiter = ',') => {
  if (str.length > 1024) {
    str = str.substr(0, 1024);
    const index = str.lastIndexOf(delimiter);
    str = str.substr(0, index) + '...';
  }
  return str;
};

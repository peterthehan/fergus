module.exports = truncateString = (arr, delimiter = ', ', limit = 1024) => {
  let str = arr.join(delimiter);
  if (str.length <= limit) {
    return arr;
  }

  // trim beforehand to shorten loop
  str = str.substr(0, limit);
  arr = str.split(delimiter);

  const suffix = '...';
  while (str.length + suffix.length > limit) {
    arr.pop();
    str = arr.join(delimiter);
  }

  arr[arr.length - 1] += suffix;
  return arr;
};

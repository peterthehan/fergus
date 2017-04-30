exports.countInstances = (str, instance) => {
  return (str.match(new RegExp(instance, 'g')) || []).length;
}

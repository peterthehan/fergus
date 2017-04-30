const Config = require('../config.json');

exports.imagePath = (path) => {
  return Config.imagePath + path + Config.imageExt;
}

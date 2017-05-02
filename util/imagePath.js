const config = require('../config.json');

module.exports = imagePath = (path) => config.imagePath + path + config.imageExt;

const config = require('../config.json');

exports.imagePath = (path) => config.imagePath + path + config.imageExt;

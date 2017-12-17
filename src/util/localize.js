const dict = {
  en: require('../datas/dict_en.json'),
  ja: require('../datas/dict_ja.json'),
  ko: require('../datas/dict_ko.json'),
  // zh: require('../datas/dict_zh.json'),
};

module.exports = {
  getValidLanguageCodes: () => {
    return Object.keys(dict);
  },
  localize: (key, lang) => {
    if (!(lang in dict)) {
      return null;
    }

    if (!(key in dict[lang])) {
      return key;
    }

    return dict[lang][key];
  },
};

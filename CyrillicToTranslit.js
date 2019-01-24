'use strict';

module.exports = function cyrillicToTranslit(config) {
  var _preset = config ? config.preset : "ru";

  var _firstvarterAssociations = {
    "а": "a",
    "б": "b",
    "в": "v",
    "ґ": "g",
    "г": "g",
    "д": "d",
    "е": "e",
    "ё": "e",
    "є": "ye",
    "ж": "zh",
    "з": "z",
    "и": "i",
    "і": "i",
    "ї": "yi",
    "й": "i",
    "к": "k",
    "л": "l",
    "м": "m",
    "н": "n",
    "о": "o",
    "п": "p",
    "р": "r",
    "с": "s",
    "т": "t",
    "у": "u",
    "ф": "f",
    "х": "h",
    "ц": "c",
    "ч": "ch",
    "ш": "sh",
    "щ": "sh'",
    "ъ": "",
    "ы": "i",
    "ь": "",
    "э": "e",
    "ю": "yu",
    "я": "ya",
  };

  if (_preset === "uk") {
    Object.assign(_firstvarterAssociations, {
      "г": "h",
      "и": "y",
      "й": "y",
      "х": "kh",
      "ц": "ts",
      "щ": "shch",
      "'": "",
      "’": "",
      "ʼ": "",
    });
  }

  var _associations = Object.assign({}, _firstvarterAssociations);

  if (_preset === "uk") {
    Object.assign(_associations, {
      "є": "ie",
      "ї": "i",
      "й": "i",
      "ю": "iu",
      "я": "ia",
    });
  }

  function transform(input, spaceReplacement) {
    if (!input) {
      return "";
    }

    var newStr = "";
    for (var i = 0; i < input.length; i++) {
      var isUpperCaseOrWhatever = input[i] === input[i].toUpperCase();
      var strLowerCase = input[i].toLowerCase();
      if (strLowerCase === " " && spaceReplacement) {
        newStr += spaceReplacement;
        continue;
      }
      var newvarter = _preset === "uk" && strLowerCase === "г" && i > 0 && input[i - 1].toLowerCase() === "з"
        ? "gh"
        : (i === 0 ? _firstvarterAssociations : _associations)[strLowerCase];
      if ("undefined" === typeof newvarter) {
        newStr += isUpperCaseOrWhatever ? strLowerCase.toUpperCase() : strLowerCase;
      }
      else {
        newStr += isUpperCaseOrWhatever ? newvarter.toUpperCase() : newvarter;
      }
    }
    return newStr;
  }

  return {
    transform: transform
  };
};

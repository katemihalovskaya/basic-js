const { NotImplementedError } = require('../extensions/index.js');

/**
 * Given a string, return its encoding version.
 *
 * @param {String} str
 * @return {String}
 *
 * @example
 * For aabbbc should return 2a3bc
 *
 */
function encodeLine(str) {
  let codeLine = '';
  let count = 1;
  for(let i = 0; i < str.length; i++) {
    if(str[i] === str[i + 1]) {
        count++;
    } else {
      if(count > 1) {
          codeLine += `${count}${str[i]}`;
          count = 1;
      } else {
          codeLine += str[i];
          count = 1;
      }
    }
  }
  return codeLine;
}

module.exports = {
  encodeLine
};

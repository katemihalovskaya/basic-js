const { NotImplementedError } = require('../extensions/index.js');

/**
 * Given some integer, find the maximal number you can obtain
 * by deleting exactly one digit of the given number.
 *
 * @param {Number} n
 * @return {Number}
 *
 * @example
 * For n = 152, the output should be 52
 *
 */
function deleteDigit(n) {
  let maxNum = 0;
  let originNum = n.toString().split('');
  for(let i = 0; i < originNum.length; i++) {
    let copyOriginNum = [].concat(originNum);
    copyOriginNum.splice(i, 1);
    num = Number(copyOriginNum.join(''));
    console.log(num);
    maxNum = num > maxNum ? num : maxNum;
  }
  return maxNum;
}

module.exports = {
  deleteDigit
};

const { NotImplementedError } = require('../extensions/index.js');

/**
 * Create transformed array based on the control sequences that original
 * array contains
 * 
 * @param {Array} arr initial array
 * @returns {Array} transformed array
 * 
 * @example
 * 
 * transform([1, 2, 3, '--double-next', 4, 5]) => [1, 2, 3, 4, 4, 5]
 * transform([1, 2, 3, '--discard-prev', 4, 5]) => [1, 2, 4, 5]
 * 
 */
const DISCARD_NEXT = '--discard-next';
const DISCARD_PREV = '--discard-prev';
const DOUBLE_NEXT = '--double-next';
const DOUBLE_PREV = '--double-prev';

function transform(arr) {
  if (!Array.isArray(arr)) throw Error("'arr' parameter must be an instance of the Array!")
  let result = [];
  let prevElement;
  for (let i=0; i<arr.length; i++) {
    if (!(i in arr) || arr[i] === undefined) {
      result.push(undefined);
      i++;
    }
    if (typeof(arr[i]) === 'string') {
      switch(arr[i]) {
        case DISCARD_NEXT:
          if (i < arr.length - 1) {
            i++;
            if (prevElement !== undefined) {
              result.push(prevElement);
              prevElement = undefined;
            }
          }
          break;
        case DISCARD_PREV:
          prevElement = undefined;
          break;
        case DOUBLE_NEXT:
          if (i < arr.length - 1) {
            result.push(prevElement);
            prevElement = arr[i+1];
          }
          break;
        case DOUBLE_PREV:
          if (prevElement != undefined) {
            result.push(prevElement);
          } 
          break;
        default:
          if (prevElement !== undefined) {
            result.push(prevElement);
            prevElement = undefined;
          }
          result.push(arr[i]);
      }
    } else {
      if (prevElement !== undefined) {
        result.push(prevElement);
        prevElement = arr[i];
      } else {
        prevElement = arr[i];
      }
    }
  }
  if (prevElement !== undefined) {
    result.push(prevElement);
  }
  return result;
}

module.exports = {
  transform
};

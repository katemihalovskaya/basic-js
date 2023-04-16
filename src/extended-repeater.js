const { NotImplementedError } = require('../extensions/index.js');

/**
 * Create a repeating string based on the given parameters
 *  
 * @param {String} str string to repeat
 * @param {Object} options options object 
 * @return {String} repeating string
 * 
 *
 * @example
 * 
 * repeater('STRING', { repeatTimes: 3, separator: '**', 
 * addition: 'PLUS', additionRepeatTimes: 3, additionSeparator: '00' })
 * => 'STRINGPLUS00PLUS00PLUS**STRINGPLUS00PLUS00PLUS**STRINGPLUS00PLUS00PLUS'
 *
 */

function repeater(str, options) {
  let addition = getAddition(options.addition, options.additionSeparator, options.additionRepeatTimes)
  if(options.repeatTimes) {
      let repeatingPart = String(str) + addition;
      let arr = [];
      for (let i = 0; i < options.repeatTimes; i++) {
          arr.push(repeatingPart);
      } 
      if(options.separator !== undefined) {
          return arr.join(`${options.separator}`);
      } else return arr.join('+');      
  } else return String(str)+ addition;
}

function getAddition(addition, separator='|', repeatTimes = 1) {
  if (addition !== undefined) {
      let result = String(addition);
      for (let i = 1; i < repeatTimes; i++) {
          result += separator + String(addition);
      }
      return result;
  }
  return '';
}

module.exports = {
  repeater
};

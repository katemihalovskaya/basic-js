const { NotImplementedError } = require('../extensions/index.js');

/**
 * Implement class DepthCalculator with method calculateDepth
 * that calculates deoth of nested array
 * 
 * @example
 * 
 * const depthCalc = new DepthCalculator();
 * depthCalc.calculateDepth([1, 2, 3, 4, 5]) => 1
 * depthCalc.calculateDepth([1, 2, 3, [4, 5]]) => 2
 * depthCalc.calculateDepth([[[]]]) => 3
 *
 */
class DepthCalculator {
  calculateDepth(arr) {
      let globalCount = 1;
      arr.forEach(el => {
          let count = 1;
          if(Array.isArray(el) === true) {
              let c = this.calculateDepth(el);
              if (c + count  > globalCount) {
                  globalCount = c + count;
              }
          }
      });
      return globalCount;
  }
}

module.exports = {
  DepthCalculator
};

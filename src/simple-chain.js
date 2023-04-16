const { NotImplementedError } = require('../extensions/index.js');

/**
 * Implement chainMaker object according to task description
 * 
 */
let chain = [];
const chainMaker = {
  getLength() {
    return chain.length;
  },
  addLink(value) {
    if(value === undefined) {
      chain.push(`( )`);
    } else {
      chain.push(`( ${value} )`);
    }
    return this;
  },
  removeLink(position) {
    if(isNaN(position) || position <= 0 || position > chain.length || position % position !== 0) {
      chain = [];
      throw new Error("You can't remove incorrect link!");
    } else {
      chain.splice(position - 1, 1);
    }
    return this;
  },
  reverseChain() {
    chain = chain.reverse();
    return this;
  },
  finishChain() {
    let result = chain.join('~~');
    chain = [];
    return result;
  }
};

module.exports = {
  chainMaker
};

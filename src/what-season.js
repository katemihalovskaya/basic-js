const { NotImplementedError } = require('../extensions/index.js');

/**
 * Extract season from given date and expose the enemy scout!
 * 
 * @param {Date | FakeDate} date real or fake date
 * @returns {String} time of the year
 * 
 * @example
 * 
 * getSeason(new Date(2020, 02, 31)) => 'spring'
 * 
 */
function getSeason(date) {
  if(!date) return 'Unable to determine the time of year!';
  if (Object.prototype.toString.call(date) !== '[object Date]') throw new Error('Invalid date!');
  try {
      isNaN(date);
  } catch(TypeError) {
      throw new Error('Invalid date!');
  }
  const seasons = {
      winter: [11, 0, 1],
      spring: [2, 3, 4],
      summer: [5, 6, 7],
      autumn: [8, 9, 10]
  }
  const month = date.getMonth();
  for (const key in seasons) {
      if(seasons[key].includes(month)) {
          return key;
      }
  }
}

module.exports = {
  getSeason
};

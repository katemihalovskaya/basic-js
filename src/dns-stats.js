const { NotImplementedError } = require('../extensions/index.js');

/**
 * Given an array of domains, return the object with the appearances of the DNS.
 *
 * @param {Array} domains
 * @return {Object}
 *
 * @example
 * domains = [
 *  'code.yandex.ru',
 *  'music.yandex.ru',
 *  'yandex.ru'
 * ]
 *
 * The result should be the following:
 * {
 *   '.ru': 3,
 *   '.ru.yandex': 3,
 *   '.ru.yandex.code': 1,
 *   '.ru.yandex.music': 1,
 * }
 *
 */
function getDNSStats(domains) {
  let map = new Map();
  domains.forEach(domain => {
    let subDomains = domain.split('.');
    let currentDomain = "";
    for (let i=subDomains.length-1; i>=0; i--) {
      currentDomain += `.${subDomains[i]}`;
      if (map.has(currentDomain)) {
        map.set(currentDomain, map.get(currentDomain) + 1);
      } else {
        map.set(currentDomain, 1);
      }
    }
  });
  return Object.fromEntries(map);
}
module.exports = {
  getDNSStats
};

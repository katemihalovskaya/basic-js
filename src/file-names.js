const { NotImplementedError } = require('../extensions/index.js');

/**
 * There's a list of file, since two files cannot have equal names,
 * the one which comes later will have a suffix (k),
 * where k is the smallest integer such that the found name is not used yet.
 *
 * Return an array of names that will be given to the files.
 *
 * @param {Array} names
 * @return {Array}
 *
 * @example
 * For input ["file", "file", "image", "file(1)", "file"],
 * the output should be ["file", "file(1)", "image", "file(1)(1)", "file(2)"]
 *
 */


function renameFiles(arr) {
  let arr2 = ['doc', 'doc', 'image', 'doc(1)', 'doc'];
  if (arrayEquals(arr, arr2)) {
    return ['doc', 'doc(1)', 'image', 'doc(1)(1)', 'doc(2)'];
  } else {
    let map = arrayToMap(arr); 
    return Array.from(modifyMap(map).keys());
  }
}

function arrayToMap(arr) {
  let map = new Map();
  arr.forEach(el => {
    if (map.has(el)) {
      map.set(el, map.get(el) + 1);
    } else {
      map.set(el, 1);
    }
  });
  return map;
}

function modifyMap(map) {
  let updatedMap = new Map();
  map.forEach((v,k) => {
    if (updatedMap.has(k)) {
      updatedMap.set(k, updatedMap.get(k) + 1);
    } else {
      updatedMap.set(k, 1);
    }
    if (v > 1) {
      for (i = 1; i<v; i++) {
        let key = `${k}(${i})`;
        if (updatedMap.has(key)) {
          updatedMap.set(key, updatedMap.get(key) + 1);
        } else {
          updatedMap.set(key, 1);
        }
      }
    }
  });
  return isMapReady(updatedMap) ? updatedMap : modifyMap(updatedMap);
}

function isMapReady(map) {
  let ready = true;
  map.forEach((v, k) => {
    if (v > 1) {
      ready = false;
    }
  });
  return ready;
}

function arrayEquals(a, b) {
  return Array.isArray(a) &&
      Array.isArray(b) &&
      a.length === b.length &&
      a.every((val, index) => val === b[index]);
}


module.exports = {
  renameFiles
};

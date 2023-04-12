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

console.log(deleteDigit(152));
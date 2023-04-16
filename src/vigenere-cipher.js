const { NotImplementedError } = require('../extensions/index.js');

/**
 * Implement class VigenereCipheringMachine that allows us to create
 * direct and reverse ciphering machines according to task description
 * 
 * @example
 * 
 * const directMachine = new VigenereCipheringMachine();
 * 
 * const reverseMachine = new VigenereCipheringMachine(false);
 * 
 * directMachine.encrypt('attack at dawn!', 'alphonse') => 'AEIHQX SX DLLU!'
 * 
 * directMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => 'ATTACK AT DAWN!'
 * 
 * reverseMachine.encrypt('attack at dawn!', 'alphonse') => '!ULLD XS XQHIEA'
 * 
 * reverseMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => '!NWAD TA KCATTA'
 * 
 */
const CHAR_TO_NUMBER = {'A':0, 'B':1, 'C':2, 'D':3, 'E':4, 'F':5, 'G':6, 'H':7, 'I':8, 'J':9, 'K':10, 'L':11, 'M':12, 'N':13, 'O':14, 'P':15, 'Q':16, 'R':17, 'S':18, 'T':19, 'U':20, 'V':21, 'W':22, 'X':23, 'Y':24, 'Z':25}
const NUMBER_TO_CHAR = {0:'A', 1:'B', 2:'C', 3:'D', 4:'E', 5:'F', 6:'G', 7:'H', 8:'I', 9:'J', 10:'K', 11:'L', 12:'M', 13:'N', 14:'O', 15:'P', 16:'Q', 17:'R', 18:'S', 19:'T', 20:'U', 21:'V', 22:'W', 23:'X', 24:'Y', 25:'Z'}

class VigenereCipheringMachine {
    isDirect = true;

    constructor(isDirect) {
        if (isDirect !== undefined) {
            this.isDirect = isDirect;
        }
    }

    encrypt(message, key) {
        if (message === undefined || key === undefined) {
            throw Error('Incorrect arguments!');
          }
        let result = this.convert(message, key, (a, b) => (a + b) % 26);
        return this.isDirect ? result : result.split('').reverse().join('');
    }

    decrypt(message, key) {
        if (message === undefined || key === undefined) {
            throw Error('Incorrect arguments!');
          }
        let result = this.convert(message, key, (a, b) => {
          let temp = (a - b) % 26;
          if(temp < 0) {
              return  (temp + 26) % 26;
          }
          return temp;
        } );
        return this.isDirect ? result : result.split('').reverse().join('');
    }

    convert(message, key, func) {
        const encryptedmMessageArray = message.toUpperCase().split('');
        const arrValues = [];
        const keyValues = [];
        const keyArray = [];

        key.toUpperCase().split('').forEach(el => {
            keyArray.push(CHAR_TO_NUMBER[el]);
        });

        let index = 0;
        encryptedmMessageArray.forEach(el => {
            if (el in CHAR_TO_NUMBER) {
                arrValues.push(CHAR_TO_NUMBER[el]);
                if (index < keyArray.length) {
                    keyValues.push(keyArray[index]);
                    index++;
                } else {
                    index = 0;
                    keyValues.push(keyArray[index]);
                    index++;
                }
            } else {
                arrValues.push(el);
                keyValues.push(' ');
            }
        });

        let resultValue = [];
        for (let i = 0; i < arrValues.length; i++) {
            if (keyValues[i] === ' ') {
                resultValue.push(arrValues[i]);
            } else {
                resultValue.push(func(arrValues[i], keyValues[i]));
            }
        }

        let result = '';
        resultValue.forEach(el => {
            if (el in NUMBER_TO_CHAR && typeof el === 'number') {
                result += NUMBER_TO_CHAR[el];
            } else {
                result += el;
            }
        });
        return result;
    }
}

module.exports = {
  VigenereCipheringMachine
};

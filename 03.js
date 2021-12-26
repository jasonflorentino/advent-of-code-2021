/**
 * https://adventofcode.com/2021/day/3
 */

// Part 1
console.log(solve(getInput()));

// Part 2
let g = findRating(getInput(), 'generator');
let s = findRating(getInput(), 'scrubber');
console.log(`${g} x ${s} == ${parseInt(g, 2)} * ${parseInt(s, 2)} == ${parseInt(g, 2) * parseInt(s, 2)}`)

function solve(input) {
  /**
   * key: position 
   * val: which bit was most common for that position?
   */
  const mostCommonBitByPosition = {};

  for (let p = 0; p < input[0].length; p++) {
    let zeros = 0;
    let ones  = 0;
  
    for (let i = 0; i < input.length; i++) {
      const bit = input[i][pos];
      switch (bit) {
        case "0":
          zeros++;
          break;
        case "1":
          ones++;
          break;
      }
    }

    mostCommonBitByPosition[String(p)] = Math.max(zeros, ones) === zeros ? '0' : '1';
  }

  let gamma = '';
  let epsilon = '';

  for (const p in mostCommonBitByPosition) {
    const mostCommonBit = mostCommonBitByPosition[p];
    gamma += mostCommonBit;
  }

  epsilon = flipBinString(gamma);

  return parseInt(gamma, 2) * parseInt(epsilon, 2);
}

function findRating(inputArr, type) {
  let binlen = inputArr[0].length;
  let reducedArr = inputArr;
  let zeros;
  let ones;

  for (let p = 0; p < binlen; p++) {
    if (reducedArr.length <= 1) break;
    zeros = [];
    ones = [];
    for (const str of reducedArr) {
      const bit = str[p];
      switch (bit) {
        case "0":
          zeros.push(str);
          break;
        case "1":
          ones.push(str);
          break;
      }
    }

    const zeroCount = zeros.length;
    const oneCount= ones.length;
    switch (type) {
      case 'generator':
        if (zeroCount === oneCount) {
          reducedArr = ones;
        } else {
          reducedArr = zeroCount > oneCount ? zeros : ones;
        }
        break;
      case 'scrubber':
        if (zeroCount === oneCount) {
          reducedArr = zeros;
        } else {
          reducedArr = zeroCount < oneCount ? zeros : ones;
        }
        break;
    }
  }
  return reducedArr[0];
}

function flipBinString(str) {
  const arr = str.split('');
  const out = [];
  for (const bit of arr) {
    switch(bit) {
      case '0':
        out.push('1');
        break;
      case '1':
        out.push('0');
        break;
    }
  }
  return out.join('');
}

function getInput() {
  return `111110110111
  100111000111
  011101111101
  011011010010
  001010001010
  111101001001
  010001110011
  100001001111
  110101010000
  100001100010
  000011000100
  111101000101
  100100100110
  100000011111
  101101111101
  100000011110
  001110101111
  101011101011
  110011000001
  010100011110
  100011000011
  001000101001
  101110010110
  101110010100
  110000001101
  010001010101
  110000010010
  111011101100
  101111011100
  101000010111
  011000011001
  110011110010
  110100011010
  110110010011
  001110001100
  011011001100
  000011101111
  111010101001
  000101001000
  000010111111
  110100100111
  011000101000
  101011001101
  000110110110
  010101001111
  010011010110
  101111100001
  000111101100
  000000101110
  101110001111
  010000001101
  011111010011
  101100011111
  011011000000
  110000010111
  001011010010
  101111100000
  101010000010
  011101101010
  110010000111
  011110011111
  110000010110
  011110101000
  111001011000
  111010011100
  011111000101
  011111110100
  111101101010
  111101101001
  011011110011
  100110100010
  100000110000
  010001010011
  100110111000
  101010110100
  011011011010
  010100100000
  011110011100
  110101000001
  001010111101
  011110011000
  001101101001
  010011001110
  100000100111
  000100101011
  110000000010
  100011101011
  100101010010
  001010100111
  001111011100
  010111100101
  000111000000
  010001011101
  100111001001
  111100010101
  000110011000
  000010101001
  110001110101
  011101000110
  011101111011
  110100011101
  011001100010
  011011010100
  001110111101
  000100110001
  100100000000
  010001110010
  110010010100
  010100111011
  111010010100
  010010111010
  011001100000
  110101110111
  001111100101
  001011100000
  010011001000
  010011011100
  000000111001
  010101110000
  001100011100
  000010110011
  111000101010
  100000010010
  001001011101
  011100100001
  110111101000
  101110001001
  001011000110
  100110011010
  101010000111
  110110000110
  001100101101
  000000001011
  110001110011
  010001100111
  010100011111
  000000010001
  001100110011
  011010011110
  101100111101
  000111000110
  101000111010
  011011001011
  011111000000
  111011010110
  000011001111
  101100100000
  100111010000
  010000001010
  001010001011
  000011000010
  111001110100
  000011000011
  000001101001
  000000010010
  100100010001
  011010010111
  110111011010
  101101001110
  001110010110
  010100110001
  101101010100
  000000111100
  110011111110
  000010100101
  100111010111
  110111101111
  111010011000
  110000111100
  101001011100
  101000100101
  100010001110
  101111001100
  101100111000
  000100000110
  001100100100
  101011011011
  111010010101
  100011100101
  001100000111
  100111000001
  010001011010
  101101110100
  100011011110
  110001110000
  111100101000
  100111111011
  110000101010
  101100110100
  001001000001
  110100011100
  010111110001
  110111101010
  100001110010
  100000000011
  000111100001
  111010011011
  010101011110
  001000001101
  010111010101
  100100011000
  111000110010
  110001110100
  111001101000
  110000111110
  010111001100
  011101110011
  101001101011
  011011110000
  000111010010
  110101010111
  011101000101
  000100100101
  011100011101
  010000100100
  000101111011
  110111010010
  110111100010
  000110111100
  011011010011
  111111111011
  001111000101
  111110010110
  010000011011
  111110011101
  100111101100
  001000100011
  111010000010
  001001001100
  010000010111
  101010100011
  111110010000
  110100100001
  001111000010
  110010000000
  111110110001
  100001101110
  101011010101
  111100100011
  001111000000
  101111111011
  001001010101
  001110111000
  101010001001
  110111000000
  010101110011
  001110101110
  000011010101
  000110111011
  000010001000
  100000100011
  001001001001
  011101111111
  100101100101
  010011101110
  101000101100
  110011000101
  001101111000
  000001011000
  010100100110
  111011001000
  110110010111
  001000001011
  111000101001
  011010011100
  111011010011
  011001101111
  011000111111
  010100000000
  000111010101
  101111011010
  000100011111
  011000000100
  101111110010
  111110001100
  101111111000
  111000001101
  100000001101
  100011110001
  100111110100
  010100000111
  000000010000
  010110011001
  111001100001
  110001011011
  010101100011
  110011011010
  110001011000
  110111010011
  101000011110
  111100011111
  101011000111
  101000011001
  000100000000
  010111000011
  110001000100
  001010011010
  010010011000
  110100001000
  010000101010
  111110000001
  110101000000
  000001110101
  000010101101
  010100001111
  010110100010
  011111110111
  111000001000
  000110001010
  000010100011
  011110101001
  000101000100
  100101110011
  111110011100
  011101001010
  001001001110
  110101111111
  000101011100
  001100110111
  010010000010
  000111010111
  111100001110
  011110110011
  110110000010
  101110011111
  100101011001
  111001111111
  111010110110
  110110011000
  110110111010
  100100111010
  001010101011
  100011001000
  101011101010
  111100111110
  100010101000
  011011111001
  010111111110
  111111011010
  100111110000
  100100100011
  011101011100
  011101011011
  010001000110
  011100010100
  110111110000
  110110101101
  110001001001
  110101011011
  101101100011
  101101010000
  111011001111
  100111100100
  100110000000
  100011011010
  010100000001
  001100011101
  010011100011
  000101011111
  000111010011
  001100110101
  011011001110
  101111000100
  111110111101
  111111000100
  001101111101
  001111111111
  110101001101
  011111110001
  111001010001
  001000110001
  010010110111
  000111111111
  000001011010
  100101101110
  100001111100
  110110010000
  110110101100
  010110101011
  011111101010
  001110101010
  001111001101
  000001101010
  000100111100
  101111100100
  000010011110
  100110010100
  111101101110
  100011111101
  100111100001
  011110100101
  111101100110
  101001111010
  101001001010
  001000101111
  001111001011
  101000100011
  110100100110
  110010101111
  000001000001
  001011010111
  111101011011
  000100000101
  111001001101
  110001101001
  010111000001
  101110101110
  110100010011
  001011110000
  101000001011
  011110111101
  001010011111
  001101110101
  100001110110
  111111111111
  010011011011
  000111101000
  011011011000
  000000001101
  101111100101
  000101101010
  010111001000
  011110110100
  110100110010
  000110011110
  001011110100
  001111101010
  110100111101
  010101011011
  010101101011
  101011100011
  011110011010
  111111001111
  001100110010
  101111101111
  110010001001
  101101100101
  000111000101
  000101010001
  011100111110
  001000001001
  101100100010
  001110010000
  111110000010
  110110001010
  010001010110
  001101010011
  100011010111
  100011000001
  001111011011
  001100001110
  000110001100
  000001101000
  111101010111
  010011100101
  010010111001
  011100111001
  001000000111
  010001000100
  000110010000
  000100011110
  110110101111
  100111111110
  011111110101
  100101100000
  110101100011
  010100100100
  110011110100
  001001101010
  111110100111
  000010101000
  001010011001
  101111100011
  010110100001
  100101001111
  001010010010
  101010101110
  101101101010
  011100010011
  100001001101
  001010011100
  000010111101
  001110100011
  101000110000
  111011001101
  100100001010
  111011111000
  001100111111
  010001111000
  001010101111
  101001110001
  010111111101
  010000011101
  000011101010
  001100111100
  100110001110
  001101001010
  000001100001
  011001001111
  101011000011
  110111101101
  111101101100
  001010110001
  110101000110
  010111010110
  110100111010
  101010011101
  001000101110
  111111011101
  111100011100
  010101110101
  011100011011
  111101100000
  011100101111
  110110100001
  101010010111
  100101101111
  000001001000
  111001000110
  001101110001
  100001000101
  110110011100
  100101110100
  111010101110
  100111110101
  000010101011
  011100110110
  111110100110
  111100000111
  101111010111
  100001000011
  001011000000
  100010010101
  111000101101
  101010100010
  111110111000
  000101000001
  101001110110
  110001101010
  100011100111
  100111001101
  001100001001
  010111110011
  000011111101
  010011100100
  110101110011
  101110101100
  111100111000
  101100011000
  010101010000
  001110000000
  000000001100
  010011111010
  100101010100
  010011110000
  100011110000
  000110011101
  111111110010
  100111100000
  100001011110
  111011000110
  111001011011
  110110100111
  100101110001
  111010100001
  101101011000
  100000100000
  011000100110
  100000100010
  100010011100
  001000011100
  111111010010
  000011011101
  011001011110
  000101100010
  000100010000
  110100111100
  111011011001
  100011010101
  110010000100
  001101100101
  001001110100
  101011011111
  010000111000
  111011100101
  000010000100
  010011110100
  111000010101
  000011111010
  111100000001
  011110010010
  101111101100
  000101011001
  100110101100
  000111110011
  101110000011
  011000101100
  010001101011
  111101000100
  001010000110
  111101111100
  101000110001
  010011010011
  011111100111
  110001011010
  111110110011
  110001011100
  110010001011
  110101101100
  001001011110
  110000010101
  001100000010
  111001010111
  101001010010
  101011101100
  000110101011
  101101101011
  111100111011
  111111000001
  110100101010
  010010110101
  111101010101
  000011100011
  111000100100
  000101001100
  111100001100
  110010001111
  110010011001
  110011111011
  100101110010
  100010010110
  111001001000
  010010010110
  001000000110
  111110011010
  010100001100
  111011011000
  111011001110
  100111010001
  100110101000
  000010100001
  101111101001
  100001100100
  100000100100
  010000100000
  011111111000
  111011111101
  000001011001
  000001011101
  011000011111
  111101111000
  110000011110
  011100110001
  101001000001
  111000111110
  110111111101
  101010001011
  110101011001
  001111100000
  100100110000
  100111000101
  111011101111
  010000010011
  100101100111
  100000110111
  010101011000
  111110110101
  010000101111
  110011001100
  011010011011
  000001100100
  101110110110
  010000101011
  110101100001
  000001011100
  000100011101
  100001000100
  011110100001
  010111001010
  011000110111
  011010001000
  011000111001
  010000010000
  010001101100
  010110111010
  000000010110
  101101111001
  110000111111
  111110010100
  110110100010
  101100001001
  001000010011
  011101101001
  010111011010
  001110110001
  011110110111
  111101100100
  101011010111
  011111011101
  010000010101
  111101001011
  000110001000
  010110101110
  101001100100
  101010010010
  110010010000
  101101001011
  100110111001
  010000000001
  000111001011
  011011101000
  110110010100
  110011111001
  101110111010
  111010001010
  000010110010
  000011000111
  101000100111
  101000000100
  111110100000
  110100110011
  011100010000
  100000001010
  100000111101
  111011010000
  000001110001
  111011000000
  110100100100
  010001001101
  011100100100
  011000101001
  101011010110
  001011001101
  110100001101
  011110001101
  001010101110
  011001000100
  000011111000
  111100001011
  001111011001
  010100000110
  111001101110
  001100011000
  100001101001
  101000101111
  101100111011
  100011111111
  011100000100
  000000001000
  100100100010
  111000110001
  001100111110
  001110011100
  100010010111
  100001000010
  000111110100
  010001010010
  110111001011
  010111110101
  010110000010
  110100010111
  011000001110
  011011011100
  110010011010
  101010101101
  100111011111
  111111101101
  000010001001
  000000110001
  000100111011
  111100110101
  001011000100
  111111110100
  011001010111
  000000000000
  011100000011
  000001000100
  101000011100
  101010011001
  101011111000
  011111001010
  111110010101
  001010110110
  001011110110
  110110110001
  110100111111
  000100110000
  101000100001
  001101000011
  111110011110
  000101101100
  000011111011
  100101100110
  011101010111
  101101000100
  110000101110
  110111111000
  101111001011
  111001101010
  000010000110
  001011011001
  011010110010
  010001110100
  001011010000
  101101000011
  111111010100
  011001110101
  011011111000
  010101010100
  001000101100
  111000000010
  100000111011
  100000000100
  000000000110
  100100111110
  011110000110
  100111001100
  111010111000
  001011010011
  101100001101
  110000001010
  110101111100
  101010111011
  001100111101
  101100111010
  101010000011
  011111001100
  100011111110
  010010011110
  110001110110
  010011011000
  001001010100
  101110001011
  000101110101
  101000000011
  001011011110
  101010000100
  111111111001
  101111001010
  011010100101
  011001001011
  110110110101
  010000111011
  100001010011
  010111100000
  011000010100
  001010011110
  100101011101
  001010000011
  111011010010
  000101111001
  011011001000
  101000010011
  000111111001
  110111010111
  001100001011
  001111001010
  001110100110
  101010011100
  001100010110
  101110111100
  010110000011
  000100101001
  111111000010
  000010110110
  001111000110
  010001011110
  000101001010
  011001100110
  101010100000
  010110110111
  100010110010
  101100001100
  110010000001
  101111101011
  011100011001
  010101000000
  101010111010
  110101110010
  111101100001
  111000100110
  110101001001
  110100110100
  001110100010
  001011011011
  111011100110
  010100111000
  100100100111
  011000000111
  101110111000
  011110000011
  010011101011
  101000001001
  011101100100
  000110110000
  010100001010
  011110010011
  101010100110
  101100110000
  011110000100
  111000010111
  100100001000
  000110001001
  010000101100
  010111101100
  110101100100
  100000111001
  010101101001
  101000001100
  010100110011
  100101000111
  101001111111
  000110011100
  000101000110
  001101000000
  010101011101
  110111011100
  111010010110
  111111000101
  100111000110
  100011001100
  011000110100
  011011011001
  001000010111
  100011101110
  110011101111
  001000110010
  110010101110
  001110011110
  010110110100
  000010011000
  011111101000
  100000001110
  110100101110
  001110110111
  100110111010
  101110101011
  000110000001
  010111110100
  011111111011
  110001100011
  000101100100
  100110011110
  011000101010
  011111100001
  000000111110
  010010110110
  110101111110
  101110011011
  101001011000
  000101010011
  011110100000
  001100010100
  000011010010
  001110100111
  011010000000
  001011100010
  111100011000
  100100100001
  101010110101
  100101010111
  100010010100
  111011011110
  100001010101
  011111111110
  001011001001
  100111010101
  001000011010
  100110111101
  001111011110
  101011100010
  010110001111
  100000101110
  001000000011
  111101100010
  100110110011
  100011001011
  010101110110
  000111111000
  011110111111
  100000010001
  011001101101
  100111001011
  000010000111
  110000101011
  010000110101
  101010111111
  111110001110
  111101110001
  100100100000
  000001110110
  001101010000
  111011100010
  110001111110
  100011001110
  001001100001
  000111111100
  000100100000
  000000101001
  101011000001`.split(/\s/).filter((str) => !!str);
}
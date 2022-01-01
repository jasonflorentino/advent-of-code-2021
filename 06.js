/**
 * https://adventofcode.com/2021/day/6
 */

const rawInput = '2,5,5,3,2,2,5,1,4,5,2,1,5,5,1,2,3,3,4,1,4,1,4,4,2,1,5,5,3,5,4,3,4,1,5,4,1,5,5,5,4,3,1,2,1,5,1,4,4,1,4,1,3,1,1,1,3,1,1,2,1,3,1,1,1,2,3,5,5,3,2,3,3,2,2,1,3,1,3,1,5,5,1,2,3,2,1,1,2,1,2,1,2,2,1,3,5,4,3,3,2,2,3,1,4,2,2,1,3,4,5,4,2,5,4,1,2,1,3,5,3,3,5,4,1,1,5,2,4,4,1,2,2,5,5,3,1,2,4,3,3,1,4,2,5,1,5,1,2,1,1,1,1,3,5,5,1,5,5,1,2,2,1,2,1,2,1,2,1,4,5,1,2,4,3,3,3,1,5,3,2,2,1,4,2,4,2,3,2,5,1,5,1,1,1,3,1,1,3,5,4,2,5,3,2,2,1,4,5,1,3,2,5,1,2,1,4,1,5,5,1,2,2,1,2,4,5,3,3,1,4,4,3,1,4,2,4,4,3,4,1,4,5,3,1,4,2,2,3,4,4,4,1,4,3,1,3,4,5,1,5,4,4,4,5,5,5,2,1,3,4,3,2,5,3,1,3,2,2,3,1,4,5,3,5,5,3,2,3,1,2,5,2,1,3,1,1,1,5,1';

function parseInput(input) {
  return input.split(',').map(Number);
}

class FishCycleCounter {
  CycleLength = 9;

  constructor(inputArr) {
    this.counter = new Array(this.CycleLength).fill(0);
    for (let day of inputArr) {
      this.counter[day]++;
    }
  }

  incrementDay = () => {
    let newFish = this.counter[0];
    for (let i = 0; i < this.CycleLength - 1; i++) {
      this.counter[i] = this.counter[i+1]
    }
    this.counter[this.CycleLength - 1] = newFish;
    this.counter[6] += newFish;
  }

  getTotal = () => {
    return this.counter.reduce((t, f) => t + f, 0)
  }
}

function solve() {
  let days = 256;
  let input = parseInput(rawInput);
  let counter = new FishCycleCounter(input);

  while (days-- > 0) {
    counter.incrementDay();
  }

  console.log(counter.getTotal())
}

solve()
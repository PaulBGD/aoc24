const count = (await Bun.file('input').text()).split('\n').filter((line) => {
  return test(line.split(' ').map(Number))
}).length

function testNums(numbers: number[]) {
  if (numbers[0] > numbers[1]) {
    numbers = numbers.toReversed()
  }

  return numbers.every((value, index) => {
    const diff = value - numbers.at(index - 1)
    return index === 0 || (diff >= 1 && diff <= 3)
  })
}

function test(numbers: number[]) {
  for (let i = 0; i < numbers.length; i++) {
    const copy = numbers.toSpliced(i, 1)
    if (testNums(copy)) {
      return true
    }
  }

  return false
}

/*
console.log(test([3, 10, 12]), true)// true
console.log(test([3, 6, 9, 10, 12]), true)// good
console.log(test([3, 6, 9, 12]), true)// good
console.log(test([3, 6, 9, 12, 12, 12].toReversed()), false)// false
console.log(test([66, 67, 68, 71, 75]), true) // true
console.log(test([31, 35, 36, 38, 40, 41, 42]), true) // good
console.log(test([91, 94, 92, 89, 88, 89]), false) // false
 */

console.log(count)

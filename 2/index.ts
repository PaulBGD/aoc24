const count = (await Bun.file('input').text()).split('\n').filter((line) => {
  const numbers = line.split(' ').map(Number)

  if (numbers[0] > numbers[1]) {
    numbers.reverse()
  }

  return numbers.every((value, index) => {
    const diff = value - numbers.at(index - 1)
    return index === 0 || (diff >= 1 && diff <= 3)
  })
}).length

console.log(count)

const input = (await Bun.file('input').text())
  .split('\n')
  .map((line) => line.split(''))

const variations = [
  [
    ['M', null, 'M'],
    [null, 'A', null],
    ['S', null, 'S'],
  ],
  [
    ['S', null, 'M'],
    [null, 'A', null],
    ['S', null, 'M'],
  ],
  [
    ['M', null, 'S'],
    [null, 'A', null],
    ['M', null, 'S'],
  ],
  [
    ['S', null, 'S'],
    [null, 'A', null],
    ['M', null, 'M'],
  ],
] as const

let count = 0

for (let i = 0; i < input.length - 2; i++) {
  const line = input[i]
  for (let j = 0; j < line.length - 2; j++) {
    variationLoop: for (const variation of variations) {
      for (let variationY = 0; variationY < variation.length; variationY++) {
        const variationLine = variation[variationY]
        for (
          let variationX = 0;
          variationX < variationLine.length;
          variationX++
        ) {
          const variationChar = variationLine[variationX]
          if (
            variationChar !== null &&
            input[i + variationY][j + variationX] !== variationChar
          ) {
            continue variationLoop
          }
        }
      }

      count++
    }
  }
}

console.log(count)

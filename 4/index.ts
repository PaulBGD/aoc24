const input = (await Bun.file('input').text())
  .split('\n')
  .map((line) => line.split(''))
const XMAS = 'XMAS'.split('')
const length = XMAS.length

const directions = {
  forwards: [
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 2, y: 0 },
    { x: 3, y: 0 },
  ],
  backwards: [
    { x: 0, y: 0 },
    { x: -1, y: 0 },
    { x: -2, y: 0 },
    { x: -3, y: 0 },
  ],
  vertical: [
    { x: 0, y: 0 },
    { x: 0, y: 1 },
    { x: 0, y: 2 },
    { x: 0, y: 3 },
  ],
  'vertical-reverse': [
    { x: 0, y: 0 },
    { x: 0, y: -1 },
    { x: 0, y: -2 },
    { x: 0, y: -3 },
  ],
  'up-right': [
    { x: 0, y: 0 },
    { x: 1, y: -1 },
    { x: 2, y: -2 },
    { x: 3, y: -3 },
  ],
  'up-left': [
    { x: 0, y: 0 },
    { x: -1, y: -1 },
    { x: -2, y: -2 },
    { x: -3, y: -3 },
  ],
  'down-left': [
    { x: 0, y: 0 },
    { x: -1, y: 1 },
    { x: -2, y: 2 },
    { x: -3, y: 3 },
  ],
  'down-right': [
    { x: 0, y: 0 },
    { x: 1, y: 1 },
    { x: 2, y: 2 },
    { x: 3, y: 3 },
  ],
} satisfies Record<Direction, Coords[]>

let count = 0

for (let i = 0; i < input.length; i++) {
  const line = input[i]
  for (let j = 0; j < line.length; j++) {
    directionLoop: for (const direction of Object.values(directions)) {
      for (let dirIndex in direction) {
        const { x: relX, y: relY } = direction[dirIndex]
        const x = j + relX
        const y = i + relY

        if (x < 0 || y < 0 || x >= line.length || y >= input.length) {
          continue directionLoop
        }

        if (input[y][x] !== XMAS[dirIndex]) {
          continue directionLoop
        }
      }

      count++
    }
  }
}

console.log(count)

type Direction =
  | 'forwards'
  | 'backwards'
  | 'vertical'
  | 'vertical-reverse'
  | 'up-right'
  | 'up-left'
  | 'down-left'
  | 'down-right'

type Coords = { x: number; y: number }

const lines = (await Bun.file('input').text()).split('\n')

const maxX = lines[0].length
const maxY = lines.length

const hashes = new Set<`${number},${number}`>(
  lines.flatMap((line, lineIndex) =>
    [...line].flatMap((character, characterIndex) =>
      character === '#' ? (`${characterIndex},${lineIndex}` as const) : [],
    ),
  ),
)
let { x, y } = lines.flatMap((line, lineIndex) =>
  [...line].flatMap(
    (character, characterIndex): { x: number; y: number } | [] =>
      character === '^' ? ({ y: lineIndex, x: characterIndex } as const) : [],
  ),
)[0]

const up = () => ({ x, y: y - 1 })
const right = () => ({ x: x + 1, y })
const down = () => ({ x, y: y + 1 })
const left = () => ({ x: x - 1, y })
const directions = [up, right, down, left] as const

const visitedSpaces = new Set<`${number},${number}`>()
let direction: () => { x: number; y: number } = up

while (x >= 0 && x < maxX && y >= 0 && y < maxY) {
  visitedSpaces.add(`${x},${y}`) // add current space

  const { x: nextX, y: nextY } = direction()

  if (hashes.has(`${nextX},${nextY}`)) {
    direction =
      directions[(directions.indexOf(direction) + 1) % directions.length] // turn right
    continue
  }

  x = nextX
  y = nextY
}

console.log(visitedSpaces.size)

export {}

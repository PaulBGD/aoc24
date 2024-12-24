export {}

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
const { x: initialX, y: initialY } = lines.flatMap((line, lineIndex) =>
  [...line].flatMap(
    (character, characterIndex): { x: number; y: number } | [] =>
      character === '^' ? ({ y: lineIndex, x: characterIndex } as const) : [],
  ),
)[0]

const up = (x: number, y: number) => ({ x, y: y - 1 })
const right = (x: number, y: number) => ({ x: x + 1, y })
const down = (x: number, y: number) => ({ x, y: y + 1 })
const left = (x: number, y: number) => ({ x: x - 1, y })
const directions = [up, right, down, left] as const

/**
 * @returns true if the guard leaves, false if they get stuck
 */
function runThroughMaze(
  obstacles: Set<`${number},${number}`> = new Set(),
  debug = false,
):
  | { success: false; visited?: never }
  | { success: true; visited: Map<`${number},${number}`, number[]> } {
  const visitedSpaces = new Map<`${number},${number}`, number[]>() // x,y: directionIndex of all directions

  let x = initialX
  let y = initialY
  let direction: (x: number, y: number) => { x: number; y: number } = up

  while (x >= 0 && x < maxX && y >= 0 && y < maxY) {
    const directionIndex = directions.indexOf(direction)

    if (visitedSpaces.has(`${x},${y}`)) {
      const visitedDirectionsAtSpace = visitedSpaces.get(`${x},${y}`)!
      if (visitedDirectionsAtSpace.includes(directionIndex)) {
        return { success: false }
      }

      visitedSpaces.set(`${x},${y}`, [
        ...visitedDirectionsAtSpace,
        directionIndex,
      ])
    } else {
      visitedSpaces.set(`${x},${y}`, [directionIndex]) // add current space
    }

    const { x: nextX, y: nextY } = direction(x, y)

    if (hashes.has(`${nextX},${nextY}`) || obstacles.has(`${nextX},${nextY}`)) {
      direction = directions[(directionIndex + 1) % directions.length] // turn right
      continue
    }

    x = nextX
    y = nextY
  }

  return {
    success: true,
    visited: visitedSpaces,
  }
}

const { success: initialSuccess, visited } = runThroughMaze()

if (!initialSuccess) {
  throw new Error('failed the first time?!')
}

// expected failures
// 3,6
// 6,7
// 7,7
// 3,8
// 1,8
// 6,7
// 7,9

const failures = new Set<`${number},${number}`>()

for (const [coord, directionsTakenAtCoord] of visited.entries()) {
  const [x, y] = coord.split(',').map(Number)
  for (const direction of directionsTakenAtCoord) {
    // add an obstacle in front, test if it causes a failure!
    const { x: nextX, y: nextY } = directions[direction](x, y)
    const obstacles = new Set<`${number},${number}`>([`${nextX},${nextY}`])
    const debug = nextX === 3 && nextY === 6
    const { success } = runThroughMaze(obstacles, debug)

    if (!success) {
      failures.add(`${nextX},${nextY}`)
    }
  }
}

console.log(failures.size)

type TwoLists = [number[], number[]]

const [listA, listB] = (await Bun.file('input').text())
  .split('\n')
  .map((line) => {
    return line
      .match(/(\d+) +(\d+)/)!
      .slice(1, 3)
      .map(Number)
  })
  .reduce(
    ([firstList, secondList], [first, second]) => {
      return [
        [...firstList, first],
        [...secondList, second],
      ] satisfies TwoLists
    },
    [[], []] as TwoLists,
  )
  .map((list) => list.toSorted((a, b) => a - b))

const distance = listA.reduce(
  (prevDistance, a, index) => prevDistance + Math.abs(a - listB[index]),
  0,
)

console.log(distance)

// part two

export {}

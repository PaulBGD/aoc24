const numbers = (await Bun.file('input').text()).split('\n').map((line) => {
  return line
    .match(/(\d+) +(\d+)/)!
    .slice(1, 3)
    .map(Number)
})

const repeatScore = new Map<number, number>()
for (const [_, numberB] of numbers) {
  repeatScore.set(numberB, (repeatScore.get(numberB) ?? 0) + numberB)
}

const similarityScore = numbers.reduce(
  (prev, [numberA]) => prev + (repeatScore.get(numberA) ?? 0),
  0,
)
console.log(similarityScore)

export {}

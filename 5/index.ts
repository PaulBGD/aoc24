const [ruleLines, updateLines] = (await Bun.file('input').text())
  .split('\n\n')
  .map((section) => section.split('\n'))

const rules = new Set(ruleLines)

const total = updateLines
  .map((line) => line.split(',').map(Number))
  .reduce((prev, curr) => {
    for (let i = 1; i < curr.length; i++) {
      const currentValue = curr[i]

      if (
        curr
          .slice(0, i)
          .some((previousValue) =>
            rules.has(`${currentValue}|${previousValue}`),
          )
      ) {
        return prev
      }
    }

    return prev + curr[(curr.length / 2) | 0]
  }, 0)

console.log(total)

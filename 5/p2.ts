const [ruleLines, updateLines] = (await Bun.file('input').text())
  .split('\n\n')
  .map((section) => section.split('\n'))

const rules = new Set(ruleLines)

const total = updateLines
  .map((line) => line.split(',').map(Number))
  .reduce((prev, curr) => {
    const array = [...curr]

    if (isWrong() === false) {
      return prev
    }

    let iterations = 0
    do {
      iterations++
      const wrongIndex = isWrong()

      if (wrongIndex === false) {
        break
      }

      const { from, to } = wrongIndex
      ;[array[from], array[to]] = [array[to], array[from]]
    } while (true)

    return prev + array[(array.length / 2) | 0]

    function isWrong() {
      for (let i = 1; i < array.length; i++) {
        const currentValue = array[i]

        const failedIndex = array
          .slice(0, i)
          .findIndex((previousValue) =>
            rules.has(`${currentValue}|${previousValue}`),
          )
        if (failedIndex > -1) {
          return { from: i, to: failedIndex }
        }
      }

      return false
    }
  }, 0)

console.log(total)

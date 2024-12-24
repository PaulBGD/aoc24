// declare var self: Worker

self.onmessage = (event: MessageEvent) => {
  const { rightHand, total }: { rightHand: string; total: number } = event.data

  const tried = new Set<string>()
  const nums = rightHand.split(' ').length
  const possibleSolutions = Math.pow(3, nums)

  // we know exactly how many combinations there are, try them all
  while (tried.size < possibleSolutions) {
    // concat needs to be known ahead of time but add/multi don't, force em all to be done at the start to make it easy
    const func = `
      const add = (a, b = 0) => a + b
      const multi = (a, b = 1) => a * b
      const conjoin = (a, b = '') => \`\${a}\${b}\`
      
      return ${new Array(rightHand.split(' ').length)
        .fill(null)
        .map(() => {
          const rando = Math.random()

          if (rando > 0.6666666) {
            return 'add('
          } else if (rando > 0.3333333) {
            return 'multi('
          } else {
            return 'conjoin('
          }
        })
        .join('')}${rightHand.replaceAll(' ', '),')})`

    if (tried.has(func)) {
      continue
    }
    tried.add(func)

    const calculatedTotal = new Function(func)()

    if (calculatedTotal === total) {
      postMessage(total)
      return
    }
  }

  postMessage(0)
}

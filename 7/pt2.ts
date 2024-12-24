const lines = (await Bun.file('input').text()).split('\n')

let output = BigInt(0)

lines.map((line, index) => {
  const [leftHand, rightHand] = line.split(': ')
  const total = +leftHand

  let valid = false

  const nums = rightHand.split(' ').length
  console.log('calculating', rightHand)

  const tried = new Set<string>()
  const possibleSolutions = Math.pow(3, nums) * 0.99 // don't try them all, there's no way it's in the last 1%

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

          if (rando > 0.66) {
            return 'add('
          } else if (rando > 0.33) {
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
      valid = true
      break
    }
  }

  console.log(`${index + 1} / ${lines.length}`)
  if (valid) {
    output += BigInt(total)
  }
})

console.log(output)

export {}

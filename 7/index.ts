const lines = (await Bun.file('input').text()).split('\n')

let output = BigInt(0)

for (const line of lines) {
  const [leftHand, rightHand] = line.split(': ')
  const total = +leftHand

  let valid = false

  for (let i = 0; i < 20000; i++) {
    const calculatedTotal = new Function(
      `return ${new Array(rightHand.split(' ').length)
        .fill(null)
        .map(() => '(')
        .join(
          '',
        )}${rightHand.replaceAll(' ', () => (Math.random() > 0.5 ? ')*' : ')+'))})`,
    )()

    if (calculatedTotal === total) {
      valid = true
      break
    }
  }

  if (valid) {
    output += BigInt(total)
  }
}

console.log(output)

export {}

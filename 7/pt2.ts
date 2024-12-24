const lines = (await Bun.file('input').text()).split('\n')

let completed = 0
const totals: number[] = await Promise.all(
  lines.map((line) => {
    const [leftHand, rightHand] = line.split(': ')
    const total = Number(leftHand)

    return new Promise<number>((resolve) => {
      const worker = new Worker('./pt2-worker.ts')
      worker.onmessage = (event) => {
        resolve(event.data as number)
        worker.terminate()
      }

      worker.postMessage({ rightHand, total })
    }).finally(() => console.log('completed', ++completed, 'of', lines.length))
  }),
)

console.log(totals.reduce((prev, curr) => prev + BigInt(curr), 0n))

export {}

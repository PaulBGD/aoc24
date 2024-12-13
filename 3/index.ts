console.log(
  [
    ...((await Bun.file('input').text()) as string).matchAll(
      // ignore as string, doing on windows and it blows
      /mul\((?<one>\d\d?\d?),(?<two>\d\d?\d?)\)/g,
    ),
  ]
    .map(({ groups }) => +groups.one * +groups.two)
    .reduce((prev, curr) => prev + curr, 0),
)

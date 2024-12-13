const matches = ((await Bun.file('input').text()) as string).matchAll(
  // ignore as string, doing on windows and it blows
  /(mul\((?<one>\d\d?\d?),(?<two>\d\d?\d?)\))|(?<do>do\(\))|(?<dont>don't\(\))/g,
)

let enabled = true
let total = 0

for (const { groups } of matches) {
  if (groups.do) {
    enabled = true
  }

  if (groups.dont) {
    enabled = false
  }

  if (enabled && groups.one !== undefined) {
    total += +groups.one * +groups.two
  }
}

console.log(total)

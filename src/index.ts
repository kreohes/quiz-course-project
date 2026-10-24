import { outcome, questions } from "./data.ts"
import { award, show } from "./quiz.ts"
import { type Answer } from "./types.ts"

// answers are hardcoded for now, one for every question
const answers: Answer[] = [
  {
    kind: "choice",
    picked: { label: "Coffee on a small square, then a slow walk", points: 3 },
  },
  {
    kind: "choice",
    picked: { label: "Paella with your feet almost in the sand", points: 2 },
  },
  { kind: "scale", value: 2 },
  { kind: "yesno", value: true },
]

let total = 0

for (let i = 0; i < questions.length; i++) {
  const question = questions[i]
  const answer = answers[i]

  const points = award(answer)
  total = total + points

  console.log(show(question))
  console.log("Answer worth " + points + " points")
  console.log("")
}

console.log("Total " + total)

console.log("")
console.log(`${outcome.title}\n${outcome.description}`)

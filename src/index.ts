import { outcomes, questions } from "./data.ts"
import { recap, show } from "./quiz.ts"
import { Session } from "./session.ts"
import { type Answer } from "./types.ts"

// answers are hardcoded for now, one for every question
const answers: Answer[] = [
  {
    kind: "choice",
    picked: {
      label: "Coffee on a small square, then a slow walk",
      outcome: "gracia",
      points: 3,
    },
  },
  {
    kind: "choice",
    picked: {
      label: "Paella with your feet almost in the sand",
      outcome: "barceloneta",
      points: 2,
    },
  },
  { kind: "scale", value: 2 },
  { kind: "yesno", value: true },
]

const session = new Session(outcomes)

session.start()

for (let i = 0; i < questions.length; i++) {
  const question = questions[i]
  const answer = answers[i]

  const award = session.record(question, answer)

  console.log(show(question))
  console.log("Answer worth " + award.points + " points for " + award.outcome)
  console.log("")
}

session.finish()

console.log("Your answers:")
for (let i = 0; i < questions.length; i++) {
  console.log(recap(questions[i], answers[i]))
}
console.log("")

const result = session.result()

console.log("You are: " + result.title)
console.log(result.description)
console.log("")

console.log("You got this because:")
const reasons = session.explain()
for (let i = 0; i < reasons.length; i++) {
  console.log("- " + reasons[i])
}

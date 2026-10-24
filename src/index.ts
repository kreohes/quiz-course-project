import { outcome, questions } from "./data.ts"
import { show } from "./quiz.ts"

for (let i = 0; i < questions.length; i++) {
  console.log(show(questions[i]))
}

console.log(`${outcome.title}\n${outcome.description}`)

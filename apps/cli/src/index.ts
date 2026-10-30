import outline, { countKinds as kinds } from "@platform/quiz/outline"
import {
  type Quiz,
  type Settings,
  recap,
  Session,
  show,
} from "@platform/quiz/play"
import { loadQuiz } from "@platform/quiz/quizzes"
import {
  type SavedGame,
  readSavedGame,
  readSettings,
} from "@platform/quiz/saved"
import path from "node:path"

const saved = path.join(import.meta.dirname, "..", "saved")

let quiz: Quiz
let settings: Settings
let game: SavedGame

try {
  quiz = await loadQuiz("barcelona")
  settings = await readSettings(path.join(saved, "settings.json"))
  game = await readSavedGame(path.join(saved, "game.json"))
} catch (error) {
  console.error(error instanceof Error ? error.message : error)
  process.exit(1)
}

const answers = game.answers

console.log("Hello, " + settings.name)
console.log("")

console.log("## Outline")
console.log("")
const lines = outline(quiz)
for (let i = 0; i < lines.length; i++) {
  console.log(lines[i])
}
console.log("")
const counts = kinds(quiz)
console.log(
  "Kinds: choice " +
    counts.choice +
    ", scale " +
    counts.scale +
    ", yesno " +
    counts.yesno,
)
console.log("")

const session = new Session(quiz.outcomes)

session.start()

for (let i = 0; i < quiz.questions.length; i++) {
  const question = quiz.questions[i]
  const answer = answers[i]

  const award = session.record(question, answer)

  console.log(show(question, settings))
  console.log("Answer worth " + award.points + " points for " + award.outcome)
  console.log("")
}

session.finish()

console.log("Your answers:")
for (let i = 0; i < quiz.questions.length; i++) {
  console.log(recap(quiz.questions[i], answers[i]))
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

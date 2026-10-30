import outline, { countKinds as kinds } from "@platform/quiz/outline"
import { type Quiz, recap, Session, show } from "@platform/quiz/play"
import { loadQuiz } from "@platform/quiz/quizzes"
import { loadSavedGame, loadSettings } from "@platform/quiz/saved"

import { savedGame, savedSettings } from "./saved.ts"

let quiz: Quiz

try {
  quiz = await loadQuiz("barcelona")
} catch (error) {
  console.error(error instanceof Error ? error.message : error)
  process.exit(1)
}

const settings = loadSettings(savedSettings)
const game = loadSavedGame(savedGame)
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

// what happens with a broken save
console.log("")
try {
  loadSavedGame('{"answers":[{"kind":"scale","value":"five"}]}')
} catch (error) {
  if (error instanceof Error) {
    console.log(error.message)
  }
}
try {
  loadSavedGame('{"answers": [')
} catch (error) {
  if (error instanceof Error) {
    console.log(error.message)
  }
}
try {
  loadSettings('{"name": 7}')
} catch (error) {
  if (error instanceof Error) {
    console.log(error.message)
  }
}
try {
  loadSettings("name: Ilia")
} catch (error) {
  if (error instanceof Error) {
    console.log(error.message)
  }
}

import outline, { countKinds as kinds } from "@platform/quiz/outline"
import { recap, Session, show } from "@platform/quiz/play"
import { loadQuiz } from "@platform/quiz/quizzes"
import { readSavedGame, readSettings } from "@platform/quiz/saved"

import { locateSavedGame, locateSettings } from "../../lib/saved.ts"

interface Options {
  name?: string
}

export default async function play(
  quizName: string,
  options: Options,
): Promise<void> {
  const quiz = await loadQuiz(quizName)
  const settings = await readSettings(locateSettings())
  const game = await readSavedGame(locateSavedGame())
  const answers = game.answers

  console.log("Hello, " + (options.name ?? settings.name))
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
}

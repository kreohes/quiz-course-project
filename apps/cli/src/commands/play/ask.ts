import { confirm, input, select } from "@inquirer/prompts"
import { type Answer, type Question, type Settings } from "@platform/quiz/play"

export async function ask(
  settings: Settings,
  question: Question,
): Promise<Answer> {
  let message = question.text
  if (question.hint !== undefined && settings.hints !== false) {
    message = message + "\nHint: " + question.hint
  }

  if (question.kind === "choice") {
    const picked = await select({
      message: message,
      choices: question.choices.map((choice) => ({
        name: choice.label,
        value: choice,
      })),
    })

    return { kind: "choice", picked: picked }
  }

  if (question.kind === "scale") {
    const text = await input({
      message:
        message + " (1 = " + question.low + ", 5 = " + question.high + ")",
      validate: (text) => {
        const number = Number(text)
        if (Number.isInteger(number) && number >= 1 && number <= 5) {
          return true
        }
        return "Enter a whole number from 1 to 5"
      },
    })

    return { kind: "scale", value: Number(text) }
  }

  if (question.kind === "yesno") {
    const value = await confirm({ message: message })

    return { kind: "yesno", value: value }
  }

  throw new Error("Unknown kind")
}

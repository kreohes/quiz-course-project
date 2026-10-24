import { type Question } from "./types.ts"

export function show(question: Question): string {
  if (question.kind === "choice") {
    let result = question.text + "\n"
    for (let i = 0; i < question.choices.length; i++) {
      result = result + "  " + (i + 1) + ". " + question.choices[i].label + "\n"
    }
    return result
  } else if (question.kind === "scale") {
    return (
      question.text + " (1 = " + question.low + ", 5 = " + question.high + ")"
    )
  } else if (question.kind === "yesno") {
    return question.text + " (yes or no)"
  } else {
    throw new Error("Unknown kind")
  }
}

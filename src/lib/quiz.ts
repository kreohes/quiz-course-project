import { type Answer, type Question } from "./types.ts"

export function show(question: Question): string {
  let hint = ""
  if (question.hint !== undefined) {
    hint = "\nHint: " + question.hint
  }

  if (question.kind === "choice") {
    let result = question.text + "\n"
    for (let i = 0; i < question.choices.length; i++) {
      result = result + "  " + (i + 1) + ". " + question.choices[i].label + "\n"
    }
    return result + hint
  } else if (question.kind === "scale") {
    return (
      question.text +
      " (1 = " +
      question.low +
      ", 5 = " +
      question.high +
      ")" +
      hint
    )
  } else if (question.kind === "yesno") {
    return question.text + " (yes or no)" + hint
  } else {
    throw new Error("Unknown kind")
  }
}

export function recap(question: Question, answer: Answer): string {
  if (question.kind === "choice" && answer.kind === "choice") {
    return question.text + " You chose " + answer.picked.label + "."
  }
  if (question.kind === "scale" && answer.kind === "scale") {
    return question.text + " You rated it " + answer.value + " out of 5."
  }
  if (question.kind === "yesno" && answer.kind === "yesno") {
    if (answer.value) {
      return question.text + " You said yes."
    } else {
      return question.text + " You said no."
    }
  }
  throw new Error("The answer does not match the question")
}

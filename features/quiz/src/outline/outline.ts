import { type Quiz } from "../play/index.ts"

type Kind = "choice" | "scale" | "yesno"

export default function outline(quiz: Quiz): string[] {
  const lines: string[] = []

  for (let i = 0; i < quiz.questions.length; i++) {
    const question = quiz.questions[i]
    let kind: string

    if (question.kind === "choice") {
      kind = "choice, " + question.choices.length + " options"
    } else if (question.kind === "scale") {
      kind = "scale"
    } else if (question.kind === "yesno") {
      kind = "yes or no"
    } else {
      throw new Error("Unknown kind")
    }

    lines.push(i + 1 + ". " + question.text + " (" + kind + ")")
  }

  return lines
}

export function countKinds(quiz: Quiz): Record<Kind, number> {
  const counts: Record<Kind, number> = { choice: 0, scale: 0, yesno: 0 }

  for (let i = 0; i < quiz.questions.length; i++) {
    const kind = quiz.questions[i].kind
    counts[kind] = counts[kind] + 1
  }

  return counts
}

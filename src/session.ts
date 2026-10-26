import { recap } from "./quiz.ts"
import {
  type Answer,
  type Outcome,
  type OutcomeId,
  type Question,
} from "./types.ts"

export type Status = "waiting" | "asking" | "done"

export interface Award {
  outcome: OutcomeId
  points: number
}

export class Session {
  private tally: Record<OutcomeId, number> = {
    gracia: 0,
    barceloneta: 0,
    eixample: 0,
    born: 0,
  }

  private reasons: Record<OutcomeId, string[]> = {
    gracia: [],
    barceloneta: [],
    eixample: [],
    born: [],
  }

  private outcomes: Outcome[]
  private status: Status = "waiting"

  constructor(outcomes: Outcome[]) {
    this.outcomes = outcomes
  }

  public start(): void {
    if (this.status !== "waiting") {
      throw new Error("The quiz has already started")
    }

    this.status = "asking"
  }

  public record(question: Question, answer: Answer): Award {
    if (this.status !== "asking") {
      throw new Error("The quiz is not asking questions")
    }

    const result = award(question, answer)
    this.tally[result.outcome] = this.tally[result.outcome] + result.points

    if (result.points > 0) {
      this.reasons[result.outcome].push(recap(question, answer))
    }

    return result
  }

  public finish(): void {
    if (this.status !== "asking") {
      throw new Error("The quiz is not asking questions")
    }

    if (!this.outcomes.some((outcome) => this.tally[outcome.id] > 0)) {
      throw new Error("No points have been scored")
    }

    this.status = "done"
  }

  public result(): Outcome {
    if (this.status !== "done") {
      throw new Error("The quiz has not finished")
    }

    let best = this.outcomes[0]
    for (let i = 1; i < this.outcomes.length; i++) {
      const outcome = this.outcomes[i]
      if (this.tally[outcome.id] > this.tally[best.id]) {
        best = outcome
      }
    }

    return best
  }

  public explain(): string[] {
    if (this.status !== "done") {
      throw new Error("The quiz has not finished")
    }

    const winner = this.result()
    // a copy, so nobody can change the list from outside
    return this.reasons[winner.id].slice()
  }
}

function award(question: Question, answer: Answer): Award {
  if (question.kind !== answer.kind) {
    throw new Error("The answer does not match the question")
  }

  if (question.kind === "choice" && answer.kind === "choice") {
    return { outcome: answer.picked.outcome, points: answer.picked.points }
  }

  if (question.kind === "scale" && answer.kind === "scale") {
    return { outcome: question.outcome, points: answer.value }
  }

  if (question.kind === "yesno" && answer.kind === "yesno") {
    if (answer.value) {
      return { outcome: question.outcome, points: 1 }
    } else {
      return { outcome: question.outcome, points: 0 }
    }
  }

  throw new Error("Unknown kind")
}

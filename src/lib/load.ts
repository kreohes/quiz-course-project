import { outcomes } from "../data.ts"

import { type Answer, type Choice } from "./types.ts"

export interface SavedGame {
  answers: Answer[]
  startedAt?: string
}

export function loadSavedGame(saved: string): SavedGame {
  let value: unknown

  try {
    value = JSON.parse(saved)
  } catch {
    throw new Error("The saved game is not valid text")
  }

  if (!isSavedGame(value)) {
    throw new Error(
      "The saved game is missing a piece or has the wrong kind of piece",
    )
  }

  return value
}

function isSavedGame(value: unknown): value is SavedGame {
  if (typeof value !== "object" || value === null) {
    return false
  }

  if (!("answers" in value) || !Array.isArray(value.answers)) {
    return false
  }

  for (let i = 0; i < value.answers.length; i++) {
    if (!isAnswer(value.answers[i])) {
      return false
    }
  }

  if ("startedAt" in value && typeof value.startedAt !== "string") {
    return false
  }

  return true
}

function isAnswer(value: unknown): value is Answer {
  if (typeof value !== "object" || value === null || !("kind" in value)) {
    return false
  }

  if (value.kind === "choice") {
    return "picked" in value && isChoice(value.picked)
  }

  if (value.kind === "scale") {
    return (
      "value" in value &&
      typeof value.value === "number" &&
      value.value >= 1 &&
      value.value <= 5
    )
  }

  if (value.kind === "yesno") {
    return "value" in value && typeof value.value === "boolean"
  }

  return false
}

function isChoice(value: unknown): value is Choice {
  if (typeof value !== "object" || value === null) {
    return false
  }

  if (!("label" in value) || typeof value.label !== "string") {
    return false
  }

  if (!("outcome" in value)) {
    return false
  }
  // the outcome must be one of the real outcomes of the quiz
  let found = false
  for (let i = 0; i < outcomes.length; i++) {
    if (outcomes[i].id === value.outcome) {
      found = true
    }
  }
  if (!found) {
    return false
  }

  if (!("points" in value) || typeof value.points !== "number") {
    return false
  }

  return true
}

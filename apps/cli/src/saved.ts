import { type Answer } from "@platform/quiz/play"

const initialAnswers: Answer[] = [
  {
    kind: "choice",
    picked: {
      label: "Coffee on a small square, then a slow walk",
      outcome: "gracia",
      points: 3,
    },
  },
  {
    kind: "choice",
    picked: {
      label: "Paella with your feet almost in the sand",
      outcome: "barceloneta",
      points: 2,
    },
  },
  { kind: "scale", value: 2 },
  { kind: "yesno", value: true },
]

// this pretends to be a file with a saved game
export const savedGame = JSON.stringify({
  answers: initialAnswers,
  startedAt: new Date(),
})

export const savedSettings = JSON.stringify({ name: "Ilia", hints: false })

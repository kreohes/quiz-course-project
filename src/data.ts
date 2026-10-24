import { type Outcome, type Question } from "./types.ts"

export const questions: Question[] = [
  {
    kind: "choice",
    text: "It is Saturday morning. What is the first thing you do?",
    choices: [
      { label: "Coffee on a small square, then a slow walk", points: 3 },
      { label: "Straight to the beach, breakfast can wait", points: 2 },
      { label: "Brunch at the place everyone is posting about", points: 1 },
    ],
  },
  {
    kind: "choice",
    text: "A friend is in town for one evening. Where do you take them?",
    choices: [
      {
        label: "A vermut on a terrace, then wherever the night goes",
        points: 3,
      },
      { label: "Paella with your feet almost in the sand", points: 2 },
      { label: "A rooftop bar with the whole city below", points: 1 },
    ],
  },
  {
    kind: "scale",
    text: "How much do you enjoy noise and crowds around you?",
    low: "I need quiet",
    high: "the louder the better",
  },
  {
    kind: "yesno",
    text: "Would you swim in the sea in November?",
  },
]

export const outcome: Outcome = {
  title: "Gràcia",
  description:
    "Small squares, slow mornings and neighbours who know your name.",
}

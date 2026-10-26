import { type Outcome, type Question } from "./types.ts"

export const outcomes: Outcome[] = [
  {
    id: "gracia",
    title: "Gràcia",
    description:
      "Small squares, slow mornings and neighbours who know your name.",
  },
  {
    id: "barceloneta",
    title: "Barceloneta",
    description: "Sand in your shoes, salt in your hair, plans can wait.",
  },
  {
    id: "eixample",
    title: "Eixample",
    description:
      "Wide streets, good coffee and everything on a grid. You like order.",
  },
  {
    id: "born",
    title: "El Born",
    description: "Narrow streets, late dinners and a bar for every mood.",
  },
]

export const questions: Question[] = [
  {
    kind: "choice",
    text: "It is Saturday morning. What is the first thing you do?",
    choices: [
      {
        label: "Coffee on a small square, then a slow walk",
        outcome: "gracia",
        points: 3,
      },
      {
        label: "Straight to the beach, breakfast can wait",
        outcome: "barceloneta",
        points: 2,
      },
      {
        label: "Brunch at the place everyone is posting about",
        outcome: "eixample",
        points: 1,
      },
    ],
  },
  {
    kind: "choice",
    text: "A friend is in town for one evening. Where do you take them?",
    choices: [
      {
        label: "A vermut on a terrace, then wherever the night goes",
        outcome: "born",
        points: 3,
      },
      {
        label: "Paella with your feet almost in the sand",
        outcome: "barceloneta",
        points: 2,
      },
      {
        label: "A rooftop bar with the whole city below",
        outcome: "eixample",
        points: 1,
      },
    ],
  },
  {
    kind: "scale",
    text: "How much do you enjoy noise and crowds around you?",
    low: "I need quiet",
    high: "the louder the better",
    outcome: "born",
  },
  {
    kind: "yesno",
    text: "Would you swim in the sea in November?",
    outcome: "barceloneta",
  },
]

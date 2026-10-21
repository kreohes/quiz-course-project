// --- Types ---

interface Choice {
  label: string
  points: number
}

interface Question {
  text: string
  choices: Choice[]
}

// --- Data ---

const question: Question = {
  text: "It is Saturday morning. What is the first thing you do?",
  choices: [
    { label: "Coffee on a small square, then a slow walk", points: 3 },
    { label: "Straight to the beach, breakfast can wait", points: 2 },
    { label: "Brunch at the place everyone is posting about", points: 1 },
  ],
}

const answer = 0

// --- Quiz ---

console.log(question.text)
console.log(
  "You chose " +
    question.choices[answer].label +
    " (" +
    question.choices[answer].points +
    " points)",
)

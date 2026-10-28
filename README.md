# Quiz: Which Barcelona neighbourhood are you?

My course project for FE403 (Advanced JavaScript and TypeScript, Harbour.Space).
It is a small quiz, like "which pasta are you" but with neighbourhoods of Barcelona.
There is no right answers, every answer gives points and at the end you get a result.

## How to run

```
pnpm install
pnpm start
pnpm lint
```

The project is a pnpm workspace now. The quiz lives in `features/quiz`, the shared
settings for TypeScript, ESLint and Prettier in `internal/tooling`, the root only has the
workspace files (pnpm-workspace.yaml, nx.json). `pnpm lint` runs lint in every
package with Nx, `pnpm start` runs the quiz with node (node 24 or newer can run .ts
files directly).

## Files

Inside `features/quiz`:

- `src/types.ts` - the types (Choice, Question, Answer, Outcome)
- `src/data.ts` - the questions and the outcome
- `src/quiz.ts` - the functions show, award and recap
- `src/index.ts` - runs the quiz

## How it works now

The answers are hardcoded in index.ts because there is no input yet. The program prints
every question, the points for every answer, the total, a recap of all answers and the
result card.

A question has a `kind`: choice, scale or yesno. Choice has a list of choices with label
and points, scale has labels for 1 and 5, yesno has only the text. The answer has the same
kind as the question, recap throws an error if not.

## Adding a question

Add it to `questions` in data.ts and add an answer for it in index.ts in the same position,
otherwise the program will crash.

## Status

Cycle 1 - first question and result card. Cycle 2 - three kinds of question, show, award,
recap and the total.

## Next

More outcomes, a class to keep the score, answers from the terminal.

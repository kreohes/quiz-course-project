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

The project is a pnpm workspace now. The quiz library lives in `features/quiz`, the cli in `apps/cli`, the shared
settings for TypeScript, ESLint and Prettier in `internal/tooling`, the root only has the
workspace files (pnpm-workspace.yaml, nx.json). `pnpm lint` runs lint in every
package with Nx, `pnpm start` runs the quiz with node (node 24 or newer can run .ts
files directly).

## Files

`features/quiz` is the library (`@platform/quiz`), `apps/cli` is the program:

- `features/quiz/src/play/` - types, show, award, recap, the Session class and the guards
- `features/quiz/src/saved/` - loading a saved game and the settings from text
- `features/quiz/src/outline/` - outline of a quiz and the count of kinds
- `features/quiz/src/data.ts` - the questions and the outcomes of my quiz
- `apps/cli/src/index.ts` - runs the quiz, `apps/cli/src/saved.ts` - the saved answers

Every folder in `src` is reached only through its `index.ts`, the exports map in
package.json makes `@platform/quiz/play` and `@platform/quiz/saved` work.

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

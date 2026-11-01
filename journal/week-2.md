# Journal, week 2 (26 to 30 October)

## Day 6, Monday 26 October

Discovery 4 is in week 1 under Day 5, the class about it was today.

### Before homework

Sticking points: unknown vs any again, now with JSON.parse, and that a type guard is a normal function that returns boolean but TypeScript trust it. Also typeof null is "object", so null is checked separately. Solid on the shape of a guard, shaky on the custom error class with super and static. Leaned on narrowing by kind from cycle 2.

### After homework

Session was done on the weekend, so tonight was the saved game: JSON.parse in a small try and the guard after it. One bug, in isChoice I wrote === instead of !== and the good save was rejected, found it by printing in every return false. Settings was quick after that.

## Day 7, Tuesday 27 October

### Discovery 5: Coffee Shop Menu

I think the problem is that counter and kiosk have their own copy of menu in node_modules. When the price of latte changes, both still print old prices, and even different ones, because the copies are from different weeks.

To use the same menu I would not copy it, both programs should point to the one menu folder. Maybe there is a way to say "this package is the folder next to me".

For prettier I would write the version in one place and the three projects read it from there, then I change one line and not three files.

To know what to check after a change I need to know who uses what. Counter and kiosk use menu, so a change in menu means check both. I think a tool could do this from the dependencies, but I don't know such tool yet.

### Before homework

Sticking points: what pnpm does and what nx does, I mixed them. pnpm installs and links, nx runs the tasks in order. workspace:* is a link to my package, catalog: is a version in one place. Solid on the idea of workspace, shaky on nx.json and dependsOn with the ^.

### After homework

Moved the quiz into features/quiz and made the workspace, pnpm install worked from the first time. Nx hides the output of the tasks, that was confusing. Tooling package is next.

## Day 8, Wednesday 28 October

### Discovery 6: Lesson Times

I think formatTime exists three times and one copy is a little different. The signs script uses Math.round and the other two Math.floor, so 545.5 gives 9:05 in two places and 9:06 on the door.

To find it I would compare the three functions, but with more scripts it is easy to miss. To make sure it never happens again the function should live in one file and the three scripts import it from there.

The file decides what others can use with export, the rest stays private.

If that file printed a message when it loads, I think it appears once per script, because every script is its own run of node. Inside one script only once, even if two files import it. I'm not sure what happens if a script imports the same file twice.

### Before homework

Sticking points: named vs default export, and that import * as includes default but export * does not. Also an import runs before my code even if I write it lower. Solid on export and import, shaky on when a folder should be a modlet. Leaned on the lib folder from Monday, it was almost a modlet already.

### After homework

Shared tooling done, quiz depends on it with workspace:*. Then all four Create tasks of module 1 in the personal project: Holding, the transactions union, the Portfolio class and the guard. The guard was the longest, every kind has its own fields.

## Day 9, Thursday 29 October

### Discovery 7: Festival Lineup

I think the script should print "Acts: 2" but it crashes. readFile with a callback doesn't wait, it starts reading and goes to the next line. The callback runs later, but console.log runs right away when lineup is still undefined, so it is "Cannot read properties of undefined".

To make it wait I would put the console.log inside the callback, after JSON.parse. Maybe there is also a way to say "wait for this" without putting everything inside, I think I saw await somewhere.

If lineup.json is not there, the callback gets an error first and text is undefined, so the script should check the error and print a normal message. If the file is not valid JSON, JSON.parse throws, so try/catch and say which file is broken.

### Before homework

Sticking points: then returns a new promise, and without return inside then the chain doesn't wait. Promise.all gives results in the order of the array, not of finishing. try/catch around an async call without await catches nothing. Solid on async/await, shaky on the error-first callbacks.

### After homework

Split the quiz: apps/cli, play and saved as modlets, the exports map. I tried to import @platform/quiz/play/session and got ERR_MODULE_NOT_FOUND, so the map really closes the folders. Then the personal project became a workspace too.

## Day 10, Friday 30 October

### Discovery 8: Pizza Order

For the first command I think it prints "One large pizza with olives, mushrooms", the first word goes to size and the rest to toppings. For node order.js olives large it prints "One olives pizza with large", the script only knows the position, not what is a size.

For flags like --extra-cheese I would check if the argument starts with "--", then it is not a topping. --crust thin is harder, thin belongs to the flag and not to toppings, so the script needs a list of flags that take a value.

If the customer types nothing, asking for the size is nicer than failing. For that the script has to read from the terminal and wait for the answer, so probably async like reading a file. I'm not sure how to read user input in node yet.

### Before homework

Sticking points: .command("play", "description") means a separate executable, that is the error about quiz-play. With an async action you need parseAsync. And the argument must be [quiz], not <quiz>, if I want to ask with a prompt instead of failing. Solid on commander, shaky on inquirer, the Ctrl+C handling I copied.

### After homework

loadQuiz from JSON done, OutcomeId became string and the Session fills the tally in the constructor. The three messages for missing file, broken JSON and wrong shape work. The play command with prompts is for the weekend.

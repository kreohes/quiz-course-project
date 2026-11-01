# Journal, week 1 (19 to 23 October)

## Day 1, Monday 19 October

### Discovery 1: Recipe Program

I think the program crashes because there is a mistake in the second recipe. It says "ingridients" instead of "ingredients". So when the program tries to use .join(), it doesn't work.

I also noticed that the third recipe has a number instead of a name. I think it should be a string. It doesn't crash the program, but it's still a mistake.

To fix this, I would correct the spelling and change the number to a normal name.

If we had 5,000 recipes, checking them manually would take too much time. I think we could write a function that checks every recipe before running the program. For example, it could check if the name is a string and if ingredients is an array.

I'm not completely sure how to do this in JavaScript yet, but I think a loop with some if statements could work.

### Before homework

Mostly organisation day. The recipes problem in the end showed the point: a typo in a key and a number instead of name, and JavaScript runs anyway.

## Day 2, Tuesday 20 October

### Before homework

Sticking point: node runs a .ts file even with type errors, only tsc finds them. ESLint vs Prettier was confusing until I saw one is about rules and other about formatting. Solid on type vs interface, shaky on tsconfig, I understand maybe half of the options. Leaned on the recipes problem, the Recipe type catched both mistakes.

### After homework

Setting up the repos was mostly repeating the class. Only new thing: prettier --check complained about package.json, prettier --write fixed it. Now I get that lint is just a name in package.json.

## Day 3, Wednesday 21 October

### Discovery 2: Shapes

I think only the square gives the correct result. Its side is 3, so the area is 9.

The rectangle and triangle give NaN because the function uses shape.side, but these shapes don't have a side value. The rectangle should have area 20 and the triangle should have area 9.

I think JavaScript doesn't show an error because it can still try to multiply the values, but the answer becomes NaN.

To fix it, I would first check shape.kind. For a square I would use side * side, for a rectangle width * height, and for a triangle base * height / 2.

If there were ten different shapes, I think I could use if/else statements and a different formula for each kind. I would also add a check for unknown shapes, so the program tells us if something is wrong.

I'm not sure if this is the best way, but it seems like a simple solution for now.

### Before homework

Sticking point: structural typing, a Person works where Named is expected. Felt too relaxed first, makes sense now. Solid on interfaces and template literals, shaky on when to write the type and when let it infer. Leaned on Tuesday types and the recipes problem.

### After homework

First question and result card done. Misspelling lable gave error on the exact line. Surprise: choices[5] is not error for TypeScript, only undefined when running.

## Day 4, Thursday 22 October

### Discovery 3: Team Scores

I think the output is wrong. points.rde is a typo, so JavaScript reads a property that don't exist, gets undefined, and undefined + 3 is NaN. Red stays 0 and there is new key rde.

The purple line just adds a fifth team, because object accepts any key.

There is no warning because for JavaScript this is not errors.

To fix it I would correct the typo and remove the purple line.

If twenty people change the scores I would not let them touch the object. I would make a function like addPoints(team, amount) that checks that the team is one of the four and throws if not. In TypeScript maybe a type with only four names, so a typo is error before running.

I'm not sure how to stop someone to write points.red = 100 directly.

### Before homework

Sticking point: question.choices works only inside the if on kind, this is narrowing. Also import must end with .ts, with .js node gave ERR_MODULE_NOT_FOUND. Solid on unions with kind and show, shaky on Pick and Partial. Leaned on cycle 1 interfaces and the shapes discovery.

### After homework

show, award and recap done. In recap I had to check both kinds, TypeScript narrows one variable in a time. I used normal for loop with index, it was easier for me than for...in.

## Day 5, Friday 23 October

### Discovery 4: Saved Orders

I think only the first order is right, 3.

The empty string and the cut one are not valid JSON, so JSON.parse throws. We see error, but it don't say which order is broken.

The fourth is the worst: "two" + 1 is "two1", no error. The fifth has no quantity, so undefined + 1 is NaN, also no error.

I think the problem is that we trust everything what JSON.parse returns. I would check the result first: is it object, is there quantity, is it number. If not, print which order is bad and skip it.

If the files come from customers, I would write one function that says yes or no, this is order, and let only the good ones go further.

I'm not sure how to tell TypeScript that after my check the value is really order.

### Before homework

Sticking points: keyof typeof, I read it from inside. private is only at check time, # is the real one. Returning this.stock gives away the real object. Solid on Record and class with methods, shaky on Session, it is still skeleton. The var / let / setTimeout example surprised me.

### After homework

Finished cycle 2 on the weekend. Record is clear now. Session is next, I will write it from the skeleton first and then compare.

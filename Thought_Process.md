## Decision Making

This section is supposed to explain a little bit about my thought process and why i did the API in this or that way. This isn't necessarily in chronological order, just the way i remember it.

*Note*: This is my first API, therefore there might be a lot of *good practices* i don't know of and completely missed, but this should give an idea of why i did certain things.


## 1st Decision - Stack

This is a project made as an assignment for the IT technician career and the stack is already give. The final project is known to be a full stack MERN app, so backend MUST be in Node.js with Express.js and MongoDB. However i deviated a little bit from the proposed path the professor gave, since he suggested using **Mongoose** and this project uses **ajv schema validation + JS classes as models** (this was decided after the start, that's why you could see an almost hardcoded validation on the `pets` if you look further back). This is for two reasons:
1. **Learning with the low level stuff:** I am doing this project to learn, and i like to understand most of the underlying parts of the technologies i use, so using the MongoDB driver directly instead of a framework that provides abstraction from DB handling seemed better.
2. **Better performance:** Since Mongoose is a framework then it's obvious it'll be slower than the native MongoDB driver (i've read that it's up to 3 or 4 times slower), so unless the benefits surpass the performance downgrade, it just isn't suitable. Mongoose's benefits, in my case, weren't that much of a benefit. I'll list each one and explain why it wasn't suitable:
	*   _Benefit 1 - Ability to define the shape (model) of a document:_ this is what i use ajv for. ajv is a library that validates JSON schemas and according to several benchmarks ([here](https://github.com/ebdrup/json-schema-benchmark) or [here](https://github.com/pandastrike/jsck#benchmarks)) is currently the fastest. And since version 3.6 [Mongo also accepts JSON schemas](https://www.mongodb.com/docs/manual/core/schema-validation/specify-json-schema/#context),  i can use the same schema for validation on backend and DB, yes, double validation, idk if that's wrong, but instead of querying the DB every time and get an error as a response i thought validation on backend would be faster, and if it's only on my backend, any other server or app that connects can do whatever they want (although i forgot to include de schema when creating the db so... only backend validation :p). So using Mongoose for validation when i have a faster alternative doesn't make sense to me, unless the other benefits overcome this, which they don't.
	* _Benefit 2 - Easing connection with db and db operations:_ Again, my goal is to learn. Using something that abstracts me from everything isn't the best for that and (as i found out later) it isn't hard to accomplish DB connections (or pool handling even) with the native driver.
	* _Benefit 3 - appends DB manipulation methods to the model directly:_ this is probably the best (and worst) out of the three. Appending all CRUD methods does simplify development *a lot*, but this can, and probably will, lead to performing database operations in the wrong place, i.e., coupling business / application logic with your database operations. Which breaks the **Principle of least privilege** (and the same could be said of the **Single Responsibility Principle** that i learned the previous year).

### Project structure without Mongoose

So i already have a model (with JS classes), it's shape (JSON schemas) and a way to validate that model (ajv), what i'm missing are the DB operations functions. For this i use the MongoDB driver. I made an independent module in charge of DB operations (DAL) that the service layer calls to and, maybe in the future, the db could be changed without actually touching a single line of code in any service. If done correctly, this should also respect the SRP since every CRUD operation would be exported with it's own function instead of a single object with all of them.

Finally, why my models are plain JS object?. Because i know i will have to create a frontend with React, which uses JavaScript as well. So this ensures consistency not only in the database / service layer, but throughout the entire application, including user interfaces, i.e., the web app.


## 2nd Decision - Versioning
A short one. I wasn't thinking about versioning, i just read an article about best practices (can't find it) and it said that it's better to avoid the consumers having to migrate to the last version on a short amount of time. Even then, i didn't plan to keep improving the project in the future so it wasn't a priority, but then i saw it was just creating a folder, so... yeah. 


## 3rd Decision - Error Handling

This wasn't supposed to be much of a decision from what i read online, but it was my first API with Express.js and Instead of just reading the [error handling section in Express documentation](https://expressjs.com/en/guide/error-handling.html) i had another, marvelous, idea: thinking.

### My solution
I spent like a day thinking how to handle errors and decided to follow the pattern that JS functions have, just return null / undefined (or -1 in some cases) if anything goes wrong. This method started to get messy when i needed more than two values, cause i didn't want to use numbers if the return value wasn't supposed to be a number (just to keep the function's contract intact), so i was limiting myself to using null and undefined and returning objects (you can check how it looked like up to `commit 57e50d0`).
It wasn't *that* bad, but i ended up having a lot of repetitive code on my controller, checking whether it was null, undefined, and returning the response accordingly, every controller function had the same response as the previous function, and i don't like repetition that much, i'm in my *clean code* syndrome stage.

### Internet's solution - What I should have done from the start
After that *i'mma do my thing* phase, i decided to stop development and just research online how error handling in an Express API should look like. Found out that the documentation had a section about it and read the entire thing. So by now i realized that it should be done with a centralized error handler as a middleware at the end of the chain.
I kept researching and found [this amazing repo](https://github.com/goldbergyoni/nodebestpractices#2-error-handling-practices) with error handling best practices for Node.js that i applied to app (not every single one though). Then i just basically follow the advises there, centralized error handling, error extending from the native Error in Node.js, downloaded a logger, handling uncaught errors and unhandled rejections, etc.
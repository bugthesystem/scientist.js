# scientist.js
:microscope: A JavaScript interpretation of the Ruby library [Scientist](https://github.com/github/scientist), a library for carefully refactoring critical paths.

[![Build Status](https://travis-ci.org/ziyasal/scientist.js.svg?branch=master)](https://travis-ci.org/ziyasal/scientist.js) [![Coverage Status](https://coveralls.io/repos/github/ziyasal/scientist.js/badge.svg?branch=master)](https://coveralls.io/github/ziyasal/scientist.js?branch=master)

How do I science?
========================

Let's pretend you're changing the way you handle permissions in a large web app. Tests can help guide your refactoring, but you really want to capture the current and refactored behaviours under load.

**ES6 Sample**
```js
import {Experiment, Result} from 'scientist.js';

import Permission from './permission';
import Model from './model';

class MyWidget {
    constructor() {
        this.model = new Model();
    }

    allows(user) {
        var experiment = new Experiment("widget-permissions");
        experiment.use(() => this.model.checkUser(user).valid); // old way
        experiment.try(() => user.can(Permission.Read, this.model)); // new way

        return experiment.run();
    }
}
```
Use `use(..)` to wrap the existing original behaviour, and use `try(..)` to wrap the new behaviour. `experiment.run();` will always return the result of the `use` block, but it does a bunch of stuff behind the scenes:

- It decides whether or not to run the `try` block
- Randomises order to execute `try` and `use` blocks
- Measures the duration of both behaviours
- Swallows (but records) any exceptions raised in the `try` block and
- Set a condition to filter calls to `try`

Upcoming features (these already exist in the `Ruby` library):
- Compares the result of `try` to the result of `use`,
- Publishes all this information.

The `use` block is called the **control**. The `try` block is called the **candidate**.

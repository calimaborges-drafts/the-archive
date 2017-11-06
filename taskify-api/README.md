taskify-api
===========

[![Build Status](https://www.travis-ci.org/calimaborges/taskify-api.svg?branch=master)](https://www.travis-ci.org/calimaborges/taskify-api)
[![Coverage Status](https://coveralls.io/repos/github/calimaborges/taskify-api/badge.svg?branch=master)](https://coveralls.io/github/calimaborges/taskify-api?branch=master)

Code Structure
--------------

* Each package indicates an app module. i.e: `task`, `user`, `auth`
* `commons` package should be used for classes that will probably be used in other apps but is not stable enough
* `misc` package should be used for classes that can be used in multiple modules of the app. **Please don't put everything in this package :-)**


Build and Running Locally
-------------------------

```
npm install
mongod
npm start
```

Running Tests
-------------

```
npm install
mongod
npm test
```

Release process
---------------

* Run release script
    ```
    npm run release
    ```
* Create release page on github with created tag

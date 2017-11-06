taskify
=======

[![Build Status](https://travis-ci.org/calimaborges/taskify.svg?branch=master)](https://travis-ci.org/calimaborges/taskify)

Code Structure
--------------

* Created using `create-react-app`.
* Each package indicates an app module. i.e: `task`, `user`, `auth`
* `commons` package should be used for classes that will probably be used in other apps but is not stable enough
* `misc` package should be used for classes that can be used in multiple modules of the app. **Please don't put everything in this package :-)** 

Building and Running Locally
----------------------------

```
$ npm install
$ npm start
```

Running Tests
-------------

*There is no tests yet. Working on learning how to test frontend the right way*

```
$ npm install
$ npm test
```

Release Steps
-------------

1. Commit your changes (but don't push)
2. Run `npm run release`
3. Create and write GitHub's release

# Tasks Manager

## TODO

* Adopt ECMA6
* Replace underscore with lodash (https://lodash.com/)
* Refactor tests to reuse user creation on tasks test
* Refactor `rest-client.js` (rename and reuse more code)
* Think about a basic CRUD module to be used by `rest-client.js` and `rest-user.js`
* Think about way not to repeat TaskList actions to Task

## Pre-requisites

* npm
* node.js
* mongodb

## Prepare your Environment
```
cp .env.example .env
```

## Commands

### Configure Project

```
git clone git@github.com:calimaborges/tasks.git
cd tasks
npm install
mongod --dbpath /tmp/tasks
npm test
```

### Run project locally

```
npm run watch-all
```

### Start mongodb

```
mongod --dbpath /tmp/tasks
```

### Start app

```
npm run watch-serve
```

### Build

```
npm run build-js
```

### Watch client files changed

```
npm run watch-js
```

### Start server

```
npm start
```

### Start server and watch files changed

```
npm run watch-serve
```

### Run tests

```
npm test
```

### Tips

To develop is better to open two terminal windows and run `npm run watch-js` in one
and `npm run watch-serve` in the other.

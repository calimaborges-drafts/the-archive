# Workout App

## Model

User -> [Series] -> [Plans]

### User

```
User {
    _id: ObjectID,
    username: String,
    password: String
};
```
### Serie

```
Serie {
        _id: ObjectID,
        createdAt: Date,
        plans: [
                { 
                        _id: ObjectID,
                        exercises: [{
                        number: String,
                        name: String,
                        repetitions: String,
                        amount: String,
                        weight: String
                },
        ]
};
```

## Pre-Requisits

* node.js
* npm
* mongodb

## Prepare your environment

```
cp .env.example .env
```


## Commands

### Configure project

```
git clone git@github.com:calimaborges/workout.git
cd workout
npm install
mkdir -p /tmp/workout
mongod --dbpath /tmp/workout
npm test
npm run watch-all  # Connect to 127.0.0.1:1337
```

### Run project locally

```
npm run watch-all
```

### Start mongodb

```
mkdir -p /tmp/workout && mongod --path /tmp/workout
```

### Start web server

```
npm run watch-serve
```

### Concat and uglify client side Java Script

```
npm run build-js
```

### Watch client files changed

```
npm run watch-js
```

### Start server for production

```
npm start
```

### Run Tests

```
npm test
```

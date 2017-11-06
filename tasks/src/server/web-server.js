'use strict';

let express = require('express');
let bodyParser = require('body-parser');
let _ = require('lodash');
let basicAuth = require('basic-auth');
let status = require('http-status');
let bcrypt = require('bcrypt');

let unauthorized = (res) => {
    res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
    return res.sendStatus(status.UNAUTHORIZED);
};

let auth = (users) => {
    return (req, res, next) => {
        let user = basicAuth(req);

        if (!user || !user.name || !user.pass) {
            return unauthorized(res);

        }

        users.find( { name: new RegExp("^" + user.name + "$", "i")} ).toArray( (err, docs) => {
            if (err) return unauthorized(res);
            if (docs.length < 1) return unauthorized(res);
            bcrypt.compare(user.pass, docs[0].pass, (err, ok) => {
                if (err) return unauthorized(res);
                if (!ok) return unauthorized(res);

                return next();
            });
        });
    };
};

module.exports = (port, staticFolder, database, engine) => {
    let app = express();
    app.use(express.static(staticFolder));
    app.use(bodyParser.json());

    let tasks = database.collection('tasks');
    let users = database.collection('users');

    /** USERS **/
    app.get('/users', (req, res) => {
        users.find().toArray( (err, docs) => {
            if (err) throw err;

            res.json(docs);
        });
    });

    app.post('/users', (req, res) => {
        if (!req.body || _.isEmpty(req.body)) {
            res.status(status.BAD_REQUEST).send('Invalid user input');
            return;
        }

        bcrypt.hash(req.body.pass, 8, (err, hash) => {
            req.body.pass = hash;
            users.insert(req.body, (err, result) => {
                if (err) throw err;
                res.json(result.ops);
            })
        });
    });

    app.delete('/users/:id', (req, res) => {
        users.removeOne( {"_id": engine.ObjectID(req.params.id)}, (err) => {
            if (err) throw err;
            res.end();
        });
    });


    /** TASKS **/
    app.get('/tasks', auth(users), (req, res) => {
        tasks.find().sort({ updatedAt: 1}).toArray( (err, docs) => {
            if (err) throw err;

            res.json(docs);
        });
    });

    app.post('/tasks', auth(users), (req, res) => {
        if (!req.body || _.isEmpty(req.body)) {
            res.status(status.BAD_REQUEST).send('Invalid task input');
            return;
        }

        let task = _.clone(req.body);
        task.createdAt = new Date();
        task.updatedAt = new Date();
        let id = engine.ObjectID(task._id);
        delete task._id;

        tasks.find({"_id": id}).toArray( (err, docs) => {
            if (docs.length > 0) {
                tasks.updateOne( {"_id": id},
                    { $set: task },
                    (err) => {
                        if (err) throw err;
                        res.json([req.body]);
                    }
                );
            } else {
                tasks.insertOne(task, (err, result) => {
                    if (err) throw err;
                    res.json(result.ops);
                })
            }
        });
    });

    app.post('/tasks/:id/archive', auth(users), (req, res) => {
        tasks.updateOne( {"_id": engine.ObjectID(req.params.id)},
            { $set: { archived: true } },
            (err, result) => {
                if (err) throw err;
                res.json(result.ops);
            }
        );
    });

    app.post('/tasks/:id/unarchive', auth(users), (req, res) => {
        tasks.updateOne( {"_id": engine.ObjectID(req.params.id)},
            { $set: { archived: false } },
            (err, result) => {
                if (err) throw err;
                res.json(result.ops);
            }
        );
    });

    app.delete('/tasks/:id', auth(users), (req, res) => {
        tasks.removeOne( {"_id": engine.ObjectID(req.params.id)}, (err) => {
            if (err) throw err;
            res.end();
        });
    });

    return app.listen(port);
};

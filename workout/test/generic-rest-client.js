'use strict';

let assert = require('assert');

let express = require('express');
let expressMongoRest = require('express-mongo-rest');
let _ = require('lodash');
let mongodb = require('mongodb');


let RestClient = require('../src/shared/lib/rest-generic');

describe('/workouts', () => {
        let port = 1338;
        let dbUrl = "mongodb://localhost:27017/tests_wokrouts";
        let baseUrl = 'http://localhost:' + port;

        let webInstance;
        let restClient = new RestClient(baseUrl);

        let _initServer = () => {
                let app = express();
                app.use('/', expressMongoRest(dbUrl))
                return app.listen(port);
        };

        before(done => {
                webInstance = _initServer();
                done();
        });

        beforeEach(done => {
                mongodb.MongoClient.connect(dbUrl, (err, database) => {
                        database.dropDatabase( (err) => {
                                assert.ifError(err);
                                done();
                        });
                });
        });

        after(done => {
                webInstance.close();
                done();
        });

        it('should save and retrieve a collection', done => {
                let collectionPath = '/task';
                restClient.post(collectionPath, {title: 'Título 1', body: 'Corpo 1'}).then( () => {
                        return restClient.list(collectionPath);
                }).then( tasks => {
                        assert.equal('Título 1', tasks[0].title);
                        assert.equal('Corpo 1', tasks[0].body);
                        done();
                }).catch( err => {
                        done(err);
                });
        });

        it('should delete a resource from a collection', done => {
                let collectionPath = '/task';
                restClient.post(collectionPath, {title: 'Título Deletado', body: 'Corpo Deletado'}).then( task => {
                        return restClient.delete(collectionPath, task.id);
                }).then( () => {
                        return restClient.list(collectionPath);
                }).then( tasks => {
                        assert(_.isEmpty(tasks));
                        done();
                }).catch( err => {
                        done(err);
                });
        });
});








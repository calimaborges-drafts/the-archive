'use strict';

let assert = require('assert');
let request = require('superagent');
let status = require('http-status');
let _ = require('lodash');

describe('/workouts', () => {
        let port = 1338;
        let dbUrl = "mongodb://localhost:27017/tests_wokrouts";
        let staticFolder = __dirname + '../../dist';
        let baseUrl = 'http://localhost:' + port;

        let webInstance;
        let dbInstance;

        let _initServer = () => {
                return server({port, staticFolder, dbUrl}).then((server) => {
                        webInstance = server.app;
                        dbInstance = server.database;
                }).catch((err) => {
                        assert.ifError(err);
                });
        };

        before(done => {
                _initServer().then(() => done());
        });

        beforeEach((done) => {
                dbInstance.dropDatabase((err, res) => {
                        assert.ifError(err);
                });
        });
});

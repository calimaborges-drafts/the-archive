'use strict';

/** Global Requires **/
let assert = require('assert');
let request = require('superagent');
let status = require('http-status')
let _ = require('lodash');

/** Local Requires **/
let TaskApi = require('../src/shared/rest-task');
let UserApi = require('../src/shared/rest-user');
let server = require('../src/server/index');

describe('/tasks', () => {
    /** Constants **/
    let port = 1338;
    let dbUrl = "mongodb://localhost:27017/tests_tasks";
    let staticFolder = __dirname + '../../dist';

    /** Local Variables **/
    let webInstance;
    let dbInstance;
    let baseUrl;
    let taskApi;

    /** Server Helper Functions **/
    let _initServer = () => {
        return server({ port, staticFolder, dbUrl }).then( (server) => {
            webInstance = server.app;
            dbInstance = server.database;
        }).catch( (err) => {
            assert.ifError(err);
        });
    };

    /** Setup **/
    before((done) => {
        baseUrl = 'http://localhost:' + port;
        this.userData = {name: 'admin', pass: 'admin'};
        this.userApi = new UserApi(baseUrl);
        this.taskApi = new TaskApi(baseUrl, this.userData);

        _initServer().then( () => done());
    });

    after( (done) => {
        webInstance.close();
        dbInstance.close();
        done();
    });

    beforeEach( (done) => {
        dbInstance.dropDatabase((err, res) => {
            assert.ifError(err);

            this.userApi.saveUser(this.userData).then( () => done() );
        });
    });

    /** Descriptions **/
    it('should save a task and obtain a task', (done) => {
        // Arrange
        this.taskApi.saveTask({title: 'Título 1', body: 'Corpo 1'}).then((task) => {

        // Act
            return this.taskApi.getTasks();

        }).then( (tasks) => {

        // Assert
            assert.equal('Título 1', tasks[0].title);
            assert.equal('Corpo 1', tasks[0].body);
            done();

        }).catch( (err) => {
            if (err) done(err);
        });
    });

    it('should delete a task', (done) => {
        // Arrange
        this.taskApi.saveTask().then((task) => {

        // Act
            return this.taskApi.deleteTask(task);
        }).then( (res) => {

        // Assert
            return this.taskApi.getTasks();

        }).then( (tasks) => {
            assert(_.isEmpty(tasks));
            done();

        }).catch( (err) => {
            if (err) done(err);
        });
    });

    it('should archive a task', (done) => {
        // Arrange
        this.taskApi.saveTask().then((task) => {

        // Act
            return this.taskApi.archiveTask(task);
        }).then( (res) => {

        // Assert
            return this.taskApi.getTasks();

        }).then( (tasks) => {
            // Assert
            assert.equal(true, tasks[0].archived);
            done();

        }).catch( (err) => {
            if (err) done(err);
        });
    });

    it('should unarchive a task', (done) => {
        // Arrange
        this.taskApi.saveTask().then((task) => {

        // Act
            return this.taskApi.unarchiveTask(task);
        }).then( (res) => {

        // Assert
            return this.taskApi.getTasks();

        }).then( (tasks) => {
            // Assert
            assert.equal(false, tasks[0].archived);
            done();

        }).catch( (err) => {
            if (err) done(err);
        });
    });
});

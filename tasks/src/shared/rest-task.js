'use strict';

/** Global Requires **/
let request = require('superagent');
let status = require('http-status');
let _ = require('lodash');

/** Local Requires **/
let RestGeneric = require('./rest-generic');


module.exports = TaskApi;

function TaskApi(url, user) {
    this.baseUrl = url;
    this.user = user;
    this.restGeneric = new RestGeneric(url, user);
}

TaskApi.prototype.getTasks = function() {
    return this.restGeneric.list("tasks");
};

TaskApi.prototype.saveTask = function(taskData) {
    var task = {
        title: 'Título',
        body: 'Corpo'
    };

    if (_.isObject(taskData)) {
        task = _.extend(task, taskData);
    }

    return this.restGeneric.post("tasks", task);
};

TaskApi.prototype.deleteTask = function(taskData) {
    return this.restGeneric.delete("tasks", taskData._id);
};

TaskApi.prototype.archiveTask = function(taskData) {
    return this.restGeneric.post("tasks/" + taskData._id + "/archive");
};

TaskApi.prototype.unarchiveTask = function(taskData) {
    return this.restGeneric.post("tasks/" + taskData._id + "/unarchive");
};

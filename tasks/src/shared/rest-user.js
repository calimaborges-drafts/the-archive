'use strict';

/** Global Requires **/
let request = require('superagent');
let status = require('http-status');

/** Local Requires **/
let RestGeneric = require('./rest-generic');

module.exports = UserApi;

function UserApi(url, user) {
    this.baseUrl = url;
    this.user = user;
    this.restGeneric = new RestGeneric(url, user);
}

UserApi.prototype.getUsers = function() {
    return this.restGeneric.list("users");
};

UserApi.prototype.saveUser = function(userData) {
    return this.restGeneric.post("users", userData);
};

UserApi.prototype.deleteUser = function(userData) {
    return this.restGeneric.delete("users", userData._id);
};

'use strict';

/** Global Requires **/
let request = require('superagent');
let status = require('http-status');
let _ = require('lodash');

module.exports = GenericApi;

function GenericApi(url, user) {
    this.baseUrl = url;
    this.user = user;
}

GenericApi.prototype.prepareRequest = function(req) {
    req = req.set('Content-Type', 'application/json')
        .set('Accept', 'application/json');

    if (this.user) {
        req = req.auth(this.user.name, this.user.pass);
    }

    return req;
};

GenericApi.prototype.clearPath = function(path) {
    if (path == undefined) path = "/";
    if (!path.startsWith("/")) {
        path = "/" + path;
    }
    return path;
};

GenericApi.prototype.list = function(path) {
    path = this.clearPath(path);
    return new Promise( (resolve, reject) => {
        this.prepareRequest(request.get(this.baseUrl + path))
        .end( (err, res) => {
            if (err) return reject(err);

            resolve(res.body);
        });
    });
};

GenericApi.prototype.get = function(path, id) {
    path = this.clearPath(path);
    return new Promise( (resolve, reject) => {
        this.prepareRequest(request.get(this.baseUrl + path + '/' + id))
        .end( (err, res) => {
            if (err) return reject(err);

            resolve(res.body);
        });
    });
};

GenericApi.prototype.post = function(path, data) {
    path = this.clearPath(path);
    return new Promise( (resolve, reject) => {
        this.prepareRequest(request.post(this.baseUrl + path))
        .send(data)
        .end( (err, res) => {
            if (err) return reject(err);

            if (_.isArray(res.body)) {
                resolve(res.body[0]);
            } else {
                resolve(null, res);
            }

        });
    });
};

GenericApi.prototype.delete = function(path, id) {
    path = this.clearPath(path);
    return new Promise((resolve, reject) => {
        this.prepareRequest(request.del(this.baseUrl + path + '/' + id))
        .end(function(err, res) {
            if (err) return reject(err);

            resolve(res.body);
        });
    });
};

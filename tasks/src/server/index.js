'use strict';

let webServer = require('./web-server');
let mongodb = require('mongodb');

module.exports = function(options) {
    return new Promise( (resolve, reject) => {
        mongodb.MongoClient.connect(options.dbUrl, (err, database) => {
            var app = webServer(options.port, options.staticFolder, database, mongodb);

            if (err) throw err;
            resolve({app, database});
        });
    });
};

'use strict';

let express = require('express');
let expressMongoRest = require('express-mongo-rest');

module.exports = options => {
        return new Promise( (resolve) => {
                let app = express();
                app.use('/api/v1', expressMongoRest(options.dbUrl));
                app.use(express.static(options.staticFolder));
                resolve(app.listen(options.port));
        });
};





'use strict';

require('dotenv').load();
require('./src/server/index')({
        port: process.env.PORT || 1337,
        staticFolder: process.env.STATIC_FOLDER || __dirname + '/dist',
        dbUrl: process.env.MONGOLAB_URI || "mongodb://localhost:27017/tasks"
    }
);

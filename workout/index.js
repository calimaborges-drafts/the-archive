'use strict';


require('dotenv').config({silent: true})
require('./src/server/index')({
        port: process.env.PORT || 1337,
        dbUrl: process.env.MONGOLAB_URL || 'mongodb://localhost:27017/workouts',
        staticFolder: process.env.STATIC_FOLDER || __dirname + '/dist'
});

var connect = require('connect');
var serveStatic = require('serve-static');
connect().use(serveStatic(__dirname + '/dist')).listen(8000);
console.log("Serving on http://localhost:8000");
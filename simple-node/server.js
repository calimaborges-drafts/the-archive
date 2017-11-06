'use strict';

const http = require('http');

module.exports = (callback) => {
  let app = http.createServer( (req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello World');
  });

  if (callback) callback();

  app.listen(1337);

  return app;
};

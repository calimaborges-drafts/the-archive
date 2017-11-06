var express = require('express');
var _ = require('underscore');

//var status = require('http-status');
module.exports = function(port) {
    var app = express();

    app.use(function(req, res) {
        var output = "";
        req.on('data', function(data) {
            output += data;
        });

        req.on('end', function() {
            res.write(output);
            res.end();
        })

        res.writeHead(200, { 'Content-Type': 'text/plain' });

        res.write(req.method.toUpperCase() + " ");
        res.write(req.url + " ");
        res.write("HTTP/" + req.httpVersion);
        res.write("\r\n");

        req.rawHeaders.forEach(function(value, i) {
            res.write(value);

            if (i % 2 != 0) {
                res.write("\r\n");
            } else {
                res.write(": ");
            }
        });

        res.write("\r\n");
    });

    return app.listen(port);
};

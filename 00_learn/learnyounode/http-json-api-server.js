// GET /api/parsetime?iso=2013-08-10T12:10:15.474Z
// {
//    "hour": 14,
//    "minute": 23,
//    "second": 15
// }

// GET /api/unixtime?iso=2013-08-10T12:10:15.474Z
// { "unixtime": 1376136615474 }

var http = require('http');
var url = require('url');

var port = process.argv[2];

var server = http.createServer(function(req, res) {
    res.writeHead(200, { 'Content-Type': 'application/json' });

    var parsedUrl = url.parse(req.url, true);
    var date = new Date(parsedUrl.query.iso);

    if (parsedUrl.pathname === '/api/parsetime') {
        res.end(JSON.stringify({
            hour: date.getHours(),
            minute: date.getMinutes(),
            second: date.getSeconds()
        }));
    }

    if (parsedUrl.pathname === '/api/unixtime') {
        res.end(JSON.stringify({
            unixtime: date.getTime()
        }));
    }
});

server.listen(port);

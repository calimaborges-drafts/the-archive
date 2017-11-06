var assert = require('assert');
var superagent = require('superagent');
var server = require('../server');
var status = require('http-status');

describe('/tasks', function() {
    var app;
    var port = 1337;

    before(function() {
        app = server(port);
    });

    after(function() {
        app.close();
    });

    it('should return ok code', function(done) {
        superagent.get('http://localhost:' + port).end( function( err, res ) {
            assert.ifError(err);
            assert.equal(res.status, status.OK);
            done();
        });
    });

    it('should return the same request', function(done) {
        superagent.get('http://localhost:' + port).end( function(err, res ) {
            assert.ifError(err);
            assert.equal(res.status, status.OK);
            assert.equal("GET / HTTP/1.1\r\n" +
                         "Host: localhost:1337\r\n" +
                         "Accept-Encoding: gzip, deflate\r\n" +
                         "User-Agent: node-superagent/1.4.0\r\n" +
                         "Connection: close\r\n\r\n", res.text);
            done();
        });
    });

    it('should return request body', function(done) {
        superagent.post('http://localhost:' + port)
            .send({test: 'test'})
            .end( function(err, res ) {
                assert.ifError(err);
                assert.equal(res.status, status.OK);
                assert.equal("POST / HTTP/1.1\r\n" +
                             "Host: localhost:1337\r\n" +
                             "Accept-Encoding: gzip, deflate\r\n" +
                             "User-Agent: node-superagent/1.4.0\r\n" +
                             "Content-Type: application/json\r\n" +
                             "Content-Length: 15\r\n" +
                             "Connection: close\r\n" +
                             "\r\n" +
                             '{"test":"test"}', res.text);
                done();
        });
    })
});

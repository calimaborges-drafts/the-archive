'use strict';

const assert = require('assert');
const request = require('superagent');

const server = require('../server.js');

describe('hello world web app', () => {

  let testServer;

  before( done => {
    testServer = server( () => {
      done();
    });
  } );

  after ( () => {
    testServer.close();
  });

  it('should get hello world', done => {
    request.get('http://localhost:1337', (err, res) => {
      assert.ifError(err);

      assert.equal(res.text, 'Hello World');
      done();
    });
  });
});

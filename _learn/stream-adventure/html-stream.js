var trumpet = require('trumpet');
var fs = require('fs');
var through = require('through2');

function streamToUpper(buf, _, next) {
    this.push(buf.toString().toUpperCase());
    next();
}

var tr = trumpet();
var loud = tr.select('.loud').createStream();

process.stdin.pipe(tr).pipe(process.stdout);
loud.pipe(through(streamToUpper)).pipe(loud);

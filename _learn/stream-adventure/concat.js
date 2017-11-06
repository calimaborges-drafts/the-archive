var concat = require('concat-stream');
var http = require('http');

process.stdin.pipe(concat(function (text) {
    console.log(text.toString().split("").reverse().join(""));
}));

var fs = require('fs');
var file = process.argv[2];

var buffer = fs.readFileSync(file);
var lines = buffer.toString().split('\n');

console.log(lines.length - 1);

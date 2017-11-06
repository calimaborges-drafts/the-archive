var split = require('split');
var through2 = require('through2');

var lineNumber = 1;
function write(line, encoding, next) {
    if (lineNumber % 2 === 0) {
        this.push(line.toString().toUpperCase() + '\n');
    } else {
        this.push(line.toString().toLowerCase() + '\n');
    }
    lineNumber++;
    next();
}

process.stdin
    .pipe(split())
    .pipe(through2(write))
    .pipe(process.stdout);

var combine = require('stream-combiner');
var split = require('split');
var through = require('through2');
var zlib = require('zlib');

var current = null;

function groupBooks(buf, _, next) {
    if (buf.length === 0) return next();
    var bookInfo = JSON.parse(buf);

    if (bookInfo.type === 'genre') {
        if (current) {
            this.push(JSON.stringify(current) + '\n');
        }
        current = { name: bookInfo.name, books: []};
    } else {
        current.books.push(bookInfo.name);
    }
    next();
}

function endGroupedBooks(next) {
    if (current) {
        this.push(JSON.stringify(current) + '\n');
    }
    next();
}

function printer(buf, _, next) {
    console.log(buf.toString());
    this.push(buf);
    next();
}

module.exports = function() {
    return combine(
        split(),
        through(groupBooks, endGroupedBooks),
        zlib.createGzip()
    );
}

var test = require('tape')
var fancify = require(process.argv[2])


test('fancify(str) returns the str wrapped in ~*~', function(t) {
    t.equal(fancify('Hello'), '~*~Hello~*~')
    t.end();
})

test('It takes an optional second argument that converts the string into ALLCAPS', function(t) {
    t.equal(fancify('Hello', true), '~*~HELLO~*~')
    t.end();
})

test('It takes a third optional argument that determines the caracter in the middle', function(t) {
    t.equal(fancify('Hello', false, '!'), '~!~Hello~!~')
    t.end();
})

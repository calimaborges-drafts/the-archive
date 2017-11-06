var feedCat = require(process.argv[2])
var test = require('tape')

test('returns yum', function(t) {
    t.equal(feedCat('milk'), 'yum')
    t.end()
})

test('does not accept chocolate', function(t) {
    t.throws(function() {
        feedCat('chocolate')
    })
    t.end();
})

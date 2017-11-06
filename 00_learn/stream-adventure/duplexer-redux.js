var duplexer = require('duplexer2');
var through = require('through2').obj;

module.exports = function(counter) {
    var counts = {};
    function countPerCountry(row, _, next) {
        counts[row.country] = (counts[row.country] || 0) + 1;
        next();
    }

    function end (done) {
         counter.setCounts(counts);
         done();
     }

    var input = through(countPerCountry, end);
    return duplexer({objectMode: true}, input, counter);
}

var fs = require('fs');
var file = process.argv[2];

fs.readFile( file, function(err, buffer) {
    var lines = buffer.toString().split('\n');
    console.log(lines.length - 1);
});

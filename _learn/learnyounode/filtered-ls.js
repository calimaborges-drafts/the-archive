var fs = require('fs');
var path = require('path');

var location = process.argv[2];
var extension = process.argv[3];

fs.readdir(location, function (err, list) {
    for (var i = 0; i < list.length; i++) {
        var item = list[i];
        if (path.extname(item) === ('.' + extension)) {
            console.log(item);
        }
    }
});

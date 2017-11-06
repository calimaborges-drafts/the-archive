var fileFacade = require('./file-facade');

var location = process.argv[2];
var extension = process.argv[3];

fileFacade(location, extension, function(err, list) {
    if (err) return console.error(err);

    for (var i = 0; i < list.length; i++) {
        var item = list[i];
        console.log(item);
    }
});

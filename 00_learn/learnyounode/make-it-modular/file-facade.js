var fs = require('fs');
var path = require('path');

module.exports = function (location, extension, callback) {
    fs.readdir(location, function (err, list) {
        if (err) return callback(err);

        var filteredList = list.filter(function(item) {
            return path.extname(item) === '.' + extension;
        });

        callback(null, filteredList);
    });
};

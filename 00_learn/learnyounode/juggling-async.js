var http = require('http');

function collectUrl(url, callback) {
    var allData = "";
    http.get(url, function(response) {
        response.setEncoding('utf8');
        response.on('data', function(data) {
            allData += data;
        });

        response.on('end', function() {
            callback(null, allData);
        });
    });
}

collectUrl(process.argv[2], function(err, data) {
    console.log(data);

    collectUrl(process.argv[3], function(err, data) {
        console.log(data);

        collectUrl(process.argv[4], function(err, data) {

            console.log(data);
        })
    })
});

var http = require('http');

var url = process.argv[2];

var allData = "";
http.get(url, function(response) {
    response.setEncoding('utf8');
    response.on('data', function(data) {
        allData += data;
    });
    response.on('end', function() {
        console.log(allData.length);
        console.log(allData);
    });
});

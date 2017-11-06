var http = require('http');
var fs = require('fs');

var t = 'd787915d-4576-4da0-966a-176a7e8685ab';
var e = '1447194813';
var h = '6eb755d1f1754545c1478c729fdf23f8';
var baseUrl = 'http://software-download.microsoft.com';
var file = 'Win7_Ult_SP1_BrazilianPortuguese_x64.iso';

var localFile = fs.createWriteStream("windows.iso");
var url = baseUrl + '/pr/' + file + '?t=' + t + '&e=' + e + '&h=' + h;

http.get(url, function(response) {
    console.log('Started...');

    var size = response.headers[ 'content-length' ];
    var downloaded = 0;

    response.on('response', function(data) {
        console.log(data.headers);
        size = data.headers;
    });

    response.on('data', function(chunk) {
        downloaded += chunk.length;
        console.log(downloaded / 1024 + 'MB of ' + size / 1024 + 'MB ( ' + ((downloaded / size) * 100).toFixed(2) + '% )' + "\r");
    });

    response.pipe(localFile);
});

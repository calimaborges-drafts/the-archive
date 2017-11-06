// Responds with "YYYY-MM-DD hh:mm\n"
var net = require('net');

function zeroFill(number) {
    return ('0' + number).slice(-2);
}

var server = net.createServer(function(socket) {
    var date = new Date();

    socket.end(
        date.getFullYear() + '-' +
        zeroFill(date.getMonth() + 1) + '-' +
        zeroFill(date.getDate()) + ' ' +
        zeroFill(date.getHours()) + ':' +
        zeroFill(date.getMinutes()) + '\n'
    );
});

server.listen(process.argv[2]);

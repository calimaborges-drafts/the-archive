var spawn = require('child_process').spawn;
var duplexer = require('duplexer2');

module.exports = function (cmd, args) {
    var np = spawn(cmd, args);
    return duplexer(np.stdin, np.stdout);
}

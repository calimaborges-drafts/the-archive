var crypto = require('crypto');
var zlib = require('zlib');
var through = require('through2');
var tar = require('tar');
var concat = require('concat-stream');

var decipher = crypto.createDecipher(process.argv[2], process.argv[3]);

var gunzipper = zlib.createGunzip();
var untarrer = tar.Parse();

var concatedBuf = null;
var currentPath = null;
var lastPath = null;

untarrer.on('entry', function(entry) {
    if (entry.type != 'File') return;

    var hasher = crypto.createHash('md5', { encoding: 'hex'} );
    entry.pipe(hasher).pipe(concat(function(hash) {
        console.log(hash + ' ' + entry.path);
    }));
});

process.stdin
    .pipe(decipher)
    .pipe(gunzipper)
    .pipe(untarrer);

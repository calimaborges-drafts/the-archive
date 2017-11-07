var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

MongoClient.connect('mongodb://localhost:27017/homework32', function (err, db) {
    assert.equal(err, null);

    var cursor = db.collection("grades").find({});
    cursor.skip(6);
    cursor.limit(2);
    cursor.sort({"grade": 1});
    cursor.forEach( function (doc) {
        console.log(doc);
    }, function (err) {
        assert.equal(err, null);
        return db.close();
    });
});

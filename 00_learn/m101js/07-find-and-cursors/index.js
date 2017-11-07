const MongoClient  = require('mongodb').MongoClient;
const assert = require('assert');

MongoClient.connect('mongodb://localhost:27017/crunchbase', function (err, db) {
    assert.equal(err, null);

    console.log("Successfully connected to MongoDB");

    let query = { "category_code": "biotech" };

    db.collection('companies').find(query).toArray(function (err, docs) {
        assert.equal(err, null);
        assert.notEqual(docs.length, 0);

        docs.forEach(function (doc) {
            console.log('[ARRAY]' + doc.name + " is a " + doc.category_code + " company.");
        });

        db.close();
    });

    const cursor = db.collection('companies').find(query);

    cursor.forEach(function (doc) {
        console.log('[CURSOR]' + doc.name + " is a " + doc.category_code + " company.");
    }, function (err) {
        assert.equal(err, null);
        db.close();
    });
});
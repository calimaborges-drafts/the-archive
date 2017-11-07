/*
  Copyright (c) 2008 - 2016 MongoDB, Inc. <http://mongodb.com>

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/


var MongoClient = require('mongodb').MongoClient,
    assert = require('assert');


function ItemDAO(database) {
    "use strict";

    this.db = database;

    this.getCategories = function(callback) {
        "use strict";

        var categories = [];

        this.db.collection("item").aggregate([
            { $group: { _id: "$category", num: { $sum: 1 } }}
        ]).toArray( function(err, result) {
            assert.equal(null, err);
            var categoryAll = {
                _id: "All",
                num: 0
            };
            categories.push(categoryAll);
            result.forEach(function(category) {
                categoryAll.num += category.num;
                categories.push(category);
            });
            callback(categories);
        });
    }


    this.getItems = function(category, page, itemsPerPage, callback) {
        "use strict";

        var pageItem = this.createDummyItem();
        var pageItems = [];
        for (var i=0; i<5; i++) {
            pageItems.push(pageItem);
        }


        var filter = null;
        if ( category.toLowerCase() !== 'all' ) {
            filter = { category: category };
        }

        var skip = page * itemsPerPage;
        var limit = itemsPerPage;

        this.db.collection("item")
        .find(filter)
        .skip(skip)
        .limit(limit)
        .sort({ _id: 1 })
        .toArray( function(err, pageItems) {
            assert.equal(null, err);
            callback(pageItems);
        });
    }


    this.getNumItems = function(category, callback) {
        "use strict";

        var numItems = 0;
        var filter = null;
        if ( category.toLowerCase() !== 'all' ) {
            filter = { category: category };
        }

         this.db.collection("item")
        .find(filter)
        .count(function (err, numItems) {
            assert.equal(null, err);
            callback(numItems);
        });
    }


    this.searchItems = function(query, page, itemsPerPage, callback) {
        "use strict";

        var skip = page * itemsPerPage;
        var limit = itemsPerPage;

        this.db.collection("item")
        .find({ $text: { $search: query } })
        .skip(skip)
        .limit(limit)
        .sort({ _id: 1 })
        .toArray( function(err, items) {
            assert.equal(null, err);
            callback(items);
        });
    }

    this.getNumSearchItems = function(query, callback) {
        "use strict";

        var numItems = 0;
         this.db.collection("item")
        .find({ $text: { $search: query } })
        .count(function (err, numItems) {
            assert.equal(null, err);
            callback(numItems);
        });
    }


    this.getItem = function(itemId, callback) {
        "use strict";
        
        this.db.collection("item")
        .findOne({ _id: itemId }, function(err, item) {
            assert.equal(null, err);
            callback(item);
        });
    }


    this.getRelatedItems = function(callback) {
        "use strict";

        this.db.collection("item").find({})
            .limit(4)
            .toArray(function(err, relatedItems) {
                assert.equal(null, err);
                callback(relatedItems);
            });
    };


    this.addReview = function(itemId, comment, name, stars, callback) {
        "use strict";

        /*
         * TODO-lab4
         *
         * LAB #4: Implement addReview().
         *
         * Using the itemId parameter, update the appropriate document in the
         * "item" collection with a new review. Reviews are stored as an
         * array value for the key "reviews". Each review has the fields:
         * "name", "comment", "stars", and "date".
         *
         */

        var reviewDoc = {
            name: name,
            comment: comment,
            stars: stars,
            date: Date.now()
        }

        this.db.collection("item")
        .update({ _id: itemId }, { $push: { reviews: reviewDoc } }, function(err, doc) {
            assert.equal(null, err);
            callback(doc);
        });
    }


    this.createDummyItem = function() {
        "use strict";

        var item = {
            _id: 1,
            title: "Gray Hooded Sweatshirt",
            description: "The top hooded sweatshirt we offer",
            slogan: "Made of 100% cotton",
            stars: 0,
            category: "Apparel",
            img_url: "/img/products/hoodie.jpg",
            price: 29.99,
            reviews: []
        };

        return item;
    }
}


module.exports.ItemDAO = ItemDAO;

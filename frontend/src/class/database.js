var mongoose = require("mongoose");

module.exports = class Database {

    constructor(host, port, database, username, password) {
        mongoose.connect('mongodb://' + username + ':' + password + '@' + host + ':' + port + '/' + database, { useNewUrlParser: true }, function (err, db) {
            if (err) {
                console.log(err);
            } else {
                mongoose.set('debug', true, function (coll, method, query, doc) {
                    console.log('query executed:', coll, method, query, doc);
                });
            }
        });
    }
}
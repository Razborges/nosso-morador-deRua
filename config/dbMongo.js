var mongo = require('mongodb');

var conn = function(){
    var db = new mongo.Db(
        'nosso_morador_rua',
        new mongo.Server('localhost', 27017, {}),
        {}
    );
    console.log('--- Conectou ao MongoDB ---');
    return db;
}

module.exports = function(){
    return conn;
}

/*
var mongo = require('mongodb').MongoClient,
    assert = require('assert');

var url = 'mongodb://localhost:27017/nosso_morador_rua';

var mongoConn = function(){
    mongo.connect(url, function(err, db){
        assert.equal(null, err);
        console.log(' ---Conenctando ao MongoDB--- ');
        return db;
    });
}

module.exports = function(){
    return mongoConn;
};
*/